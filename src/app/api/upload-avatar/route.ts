import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { createServerSupabaseClient } from "@/utils/supabase/server";

const s3 = new S3Client({
  region: "eu-north-1",
  endpoint: process.env.MINIO_PUBLIC_URL,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY!,
    secretAccessKey: process.env.MINIO_SECRET_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("avatar_url")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Profile fetch error:", profileError.message);
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filePath = `avatars/${user.id}.${fileExt}`;

    if (profile?.avatar_url) {
      try {
        const oldKey = profile.avatar_url.split("/").slice(-2).join("/");
        await s3.send(
          new DeleteObjectCommand({
            Bucket: process.env.MINIO_BUCKET_AVATARS!,
            Key: oldKey,
          })
        );
        console.log(`Deleted old avatar: ${oldKey}`);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Delete old avatar error:", err.message);
        } else {
          console.error("Delete old avatar error:", err);
        }
      }
    }

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.MINIO_BUCKET_AVATARS!,
        Key: filePath,
        Body: buffer,
        ContentType: file.type,
        ACL: "public-read",
      })
    );

    const url = `${process.env.MINIO_PUBLIC_URL!.replace(/\/$/, "")}/${
      process.env.MINIO_BUCKET_AVATARS
    }/${filePath}`;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: url })
      .eq("id", user.id);

    await supabase.auth.updateUser({
      data: { avatar_url: url,  },
    });

    if (updateError) {
      console.error("DB update error:", updateError.message);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ url: `${url}?v=${Date.now()}` });
  } catch (err: unknown) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
