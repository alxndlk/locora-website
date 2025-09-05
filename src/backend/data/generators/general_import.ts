import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import { Client } from "pg";
import copy from "pg-copy-streams";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCORA_DATA_SET_SRC = "C:\\Users\\livik\\Developer\\locora-dataset\\en";
const TMP_FILE = "bulk_import.csv";

async function run() {
  const files = fs.readdirSync(LOCORA_DATA_SET_SRC);
  const out = fs.createWriteStream(TMP_FILE);

  for (const file of files) {
    const filePath = path.join(LOCORA_DATA_SET_SRC, file);
    try {
      const json = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      const cityId = json.city_id;
      if (!cityId) {
        console.warn(`⚠️ Нет city_id в файле ${file}`);
        continue;
      }

      const csvEscape = (val: string | null) => {
        if (val === null || val === "") return "";
        return `"${val.replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
      };

      const tips = json.tips ? JSON.stringify(json.tips) : null;

      out.write([cityId, csvEscape(tips)].join(",") + "\n");
    } catch (err) {
      console.error(`❌ Ошибка в файле ${file}:`, err);
    }
  }

  out.end();
  console.log("CSV готов:", TMP_FILE);

  // --- Подключаемся к Postgres ---
  const client = new Client({
    user: "postgres",
    host: "57.129.86.35",
    database: "locora",
    password: "Aa132465_Alxndlk",
    port: 5432,
  });
  await client.connect();

  // --- Импортируем CSV ---
  const copyFrom = `
    COPY cities_import (
      city_id,
      tips
    )
    FROM STDIN WITH CSV QUOTE '"' DELIMITER ','
  `;
  const copyStream = client.query(copy.from(copyFrom));
  const fileStream = fs.createReadStream(TMP_FILE);
  await pipeline(fileStream, copyStream);
  console.log("CSV загружен во временную таблицу");

  // --- Обновляем основную таблицу ---
  await client.query(`
    UPDATE cities c
    SET
      tips = i.tips
    FROM cities_import i
    WHERE c.city_id = i.city_id
  `);

  console.log("Таблица cities обновлена ✅");

  await client.end();
}

run().catch((err) => {
  console.error("Ошибка выполнения:", err);
});
