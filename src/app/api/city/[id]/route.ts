import { NextResponse } from "next/server";
import { pool } from "@/backend/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!/^[0-9]{10}$/.test(id)) {
    return NextResponse.json({ error: "Invalid id format" }, { status: 400 });
  }

  const origin = req.headers.get("origin") || "";
  const apiKey = req.headers.get("x-api-key");

  const allowedOrigins = ["https://locora.app", "http://localhost:3000"];

  if (
    !allowedOrigins.includes(origin) &&
    apiKey !== process.env.INTERNAL_API_KEY
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM cities WHERE city_id = $1 LIMIT 1`,
      [id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } finally {
    client.release();
  }
}
