import fs from "fs";
import { parse } from "csv-parse";
import { pool } from "../../db";

fs.createReadStream(
  new URL("../../data/assets/worldcities.csv", import.meta.url)
)
  .pipe(parse({ columns: true }))
  .on(
    "data",
    async (row: {
      city: string;
      lat: number;
      lng: number;
      country: string;
      iso2: string;
      population?: number;
      id?: number;
    }) => {
      try {
        await pool.query(
          `INSERT INTO cities (city_name, lat, lon, country_name, country_code, population, city_id)
VALUES ($1,$2,$3,$4,$5,$6,$7)`,
          [
            row.city,
            row.lat,
            row.lng,
            row.country,
            row.iso2,
            row.population || null,
            row.id || null,
          ]
        );
      } catch (err) {
        if (err instanceof Error) {
          console.error("Insert error:", err.message);
        } else {
          console.error("Insert error:", err);
        }
      }
    }
  )
  .on("end", () => {
    console.log("CSV import finished.");
  });
