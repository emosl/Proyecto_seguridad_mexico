//Equipo 1: Emilia Salazar, Ian Holender, Fernanda Osorio, Rafael Blanga, Martin Palomares
//Octubre 2023
//Integración de seguridad informática en redes y sistemas de software 

//import from fs, mongodb and path
import fs from "fs";
import { MongoClient } from "mongodb";
import path from "path";

const uri = "mongodb://127.0.0.1:27017";
const dbName = "ticket_system";
const collectionsFolder = "./collections";

//read the JSONs from the collections folder
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
//import the data to the database
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