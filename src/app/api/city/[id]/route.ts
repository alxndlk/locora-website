import { pool } from "@/backend/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await pool.connect();

    const result = await client.query(
      `SELECT *
       FROM cities
       WHERE city_id = $1
       LIMIT 1`,
      [params.id]
    );

    client.release();

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "City not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
