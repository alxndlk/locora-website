import { NextResponse } from "next/server";
import { pool } from "@/backend/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  console.log(`[API] Request city_id=${id}`);

  if (!/^[0-9]{10}$/.test(id)) {
    console.warn(`[API] Invalid ID format: ${id}`);
    return NextResponse.json({ error: "Invalid id format" }, { status: 400 });
  }

  const origin = req.headers.get("origin") || "";
  const apiKey = req.headers.get("x-api-key") || "";

  if (!origin && !apiKey) {
    console.warn("[API] Missing origin and API key");
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const apiKeyValid = process.env.INTERNAL_API_KEY;
  if (!apiKeyValid) {
    console.error("[API] INTERNAL_API_KEY is not set");
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 }
    );
  }

  const allowedOrigins = ["https://locora.app", "http://localhost:3000"];

  if (!allowedOrigins.includes(origin) && apiKey !== apiKeyValid) {
    console.warn(`[API] Forbidden request origin=${origin}`);
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let client;
  try {
    client = await pool.connect();
  } catch (err) {
    console.error("[API] DB connection failed:", err);
    return NextResponse.json(
      { error: "DB connection failed" },
      { status: 500 }
    );
  }

  try {
    const result = await client.query(
      `SELECT * FROM cities WHERE city_id = $1 LIMIT 1`,
      [id]
    );

    console.log(`[API] Query executed: ${result.rowCount} rows`);

    if (result.rowCount === 0) {
      console.info(`[API] City not found for id=${id}`);
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error("[API] Database query error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
