import { pool } from "@/backend/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { code: string } }
) {
  try {
    const client = await pool.connect();

    const result = await client.query(
      `SELECT country_code, country_name, country_flag
       FROM cities
       WHERE country_code = $1
       LIMIT 1`,
      [params.code]
    );

    client.release();

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Country not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
