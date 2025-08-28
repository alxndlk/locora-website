import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import { Client } from "pg";
import copy from "pg-copy-streams";

const LOCORA_DATA_SET_SRC = "C:\\Users\\livik\\Developer\\locora-dataset\\en";
const TMP_FILE = "bulk_import.csv";

async function run() {
  const files = fs.readdirSync(LOCORA_DATA_SET_SRC);
  const out = fs.createWriteStream(TMP_FILE);

  for (const file of files) {
    const filePath = path.join(LOCORA_DATA_SET_SRC, file);
    try {
      const json = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const title = json.welcome_message_title || "";
      const body = json.welcome_message_body || "";
      const image = json.welcome_message_image || "";
      const identifier = json.city_name || "";

      const escape = (val: string) => `"${val.replace(/"/g, '""')}"`;

      out.write(
        [escape(identifier), escape(title), escape(body), escape(image)].join(
          ","
        ) + "\n"
      );
    } catch (err) {
      console.error(`Error with file ${file}:`, err);
    }
  }

  out.end();
  console.log("CSV готов:", TMP_FILE);

  const client = new Client({
    user: "postgres",
    host: "57.129.86.35",
    database: "locora",
    password: "Aa132465_Alxndlk",
    port: 5432,
  });
  await client.connect();

  await client.query("TRUNCATE cities_import")

  const copyFrom = `
    COPY cities_import (city_name, welcome_message_title, welcome_message_body, welcome_message_image)
    FROM STDIN WITH CSV QUOTE '"'
  `;
  const copyStream = client.query(copy.from(copyFrom));
  const fileStream = fs.createReadStream(TMP_FILE);
  await pipeline(fileStream, copyStream);
  console.log("CSV загружен во временную таблицу");

  await client.query(`
    UPDATE cities c
    SET 
      welcome_message_title = i.welcome_message_title,
      welcome_message_body = i.welcome_message_body,
      welcome_message_image = i.welcome_message_image
    FROM cities_import i
    WHERE c.city_name = i.city_name
  `);

  console.log("Таблица cities обновлена ✅");

  await client.end();
}

run().catch((err) => {
  console.error("Ошибка выполнения:", err);
});
