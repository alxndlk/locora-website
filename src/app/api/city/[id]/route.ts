// eslint-disable-next-line @typescript-eslint/no-explicit-any

import { NextResponse } from "next/server";
import { pool } from "@/backend/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const client = await pool.connect();
  const { id } = params;

  const result = await client.query(
    `SELECT *
     FROM cities
     WHERE city_id = $1
     LIMIT 1`,
    [id.toUpperCase()]
  );

  client.release();

  if (result.rowCount === 0) {
    return NextResponse.json({ error: "Country not found" }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}
