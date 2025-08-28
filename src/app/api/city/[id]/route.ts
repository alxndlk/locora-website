// eslint-disable-next-line @typescript-eslint/no-explicit-any

import { NextResponse } from "next/server";
import { pool } from "@/backend/db";

export async function GET(
  req: Request,
  { params }: { params: { code: string } }
) {
  const client = await pool.connect();
  const { code } = params;

  const result = await client.query(
    `SELECT country_code, country_name, country_flag
     FROM cities
     WHERE country_code = $1
     LIMIT 1`,
    [code.toUpperCase()]
  );

  client.release();

  if (result.rowCount === 0) {
    return NextResponse.json({ error: "Country not found" }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}
