import fs from "fs";
import { MongoClient } from "mongodb";
import path from "path";

const uri = "mongodb://127.0.0.1:27017";
const dbName = "ticket_system";
const collectionsFolder = "./collections";

// Se leen todos los archivos que esten en la collectionsFolder y se meten en un
// diccionario el nombre de cada archivo y su contenido
function readFiles() {
  const data = {};

  const files = fs.readdirSync(collectionsFolder);
  files.forEach((file) => {
    const filePath = path.join(collectionsFolder, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const fileName = path.parse(file).name;

    data[fileName] = JSON.parse(fileContent.toString());
  });

  return data;
}

// Se eliminan las colecciones que ya hayan en la DB y usando el diccionario
// data se crean las colecciones y se insertan los JSONs
async function importData() {
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db(dbName);
  const data = readFiles();

  for (const element in data) {
    if (data.hasOwnProperty(element)) {
      const collection = db.collection(element);

      await collection.drop();
      await db.createCollection(element);
      await collection.insertMany(data[element]);
    }
  }

  client.close();
}

importData();