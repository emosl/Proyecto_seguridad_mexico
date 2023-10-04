import cors from "cors";
import express from "express";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// let db;
// const app = express(); // create express app, executes functions
// app.use(cors());
// app.use(bodyParser.json());



let db;
const app=express();
app.use(cors());
app.use(bodyParser.json());

async function connectDB() {
  let client = new MongoClient("mongodb://localhost:27017/ticket_system");
  await client.connect();
  db = client.db();
  console.log("Database connected.");
}

// async function log(sujeto, accion, objeto){
//   log={};
//   log["timestamp"]=new Date();
//   log["sujeto"]=sujeto;
//   log["accion"]=accion;
//   log["objeto"]=objeto;
//   await db.collection("Tickets").insertOne(log);
// }

// Define el endpoint de login
app.post("/login", async (req, res) => {
  // Recibe las credenciales del usuario
  console.log(req.body);
  let user = req.body.usuario;
  let pass = req.body.contraseña;
  let data = await db.collection("Tickets").findOne({ usuario: user });
  console.log(data);
  if (data == null) {
    res.sendStatus(401);
  } else {
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(pass, salt, async (error, hash) => {
        bcrypt.compare(pass, data.contraseña, (error, result) => {
            if (result) {
            let token = jwt.sign({ usuario: data.usuario }, "secretKey", {
              expiresIn: 600,
            });
            // log(user, "login", "");
            res.json({
              token: token,
              usuario: data.usuario,
              nombre: data.nombre,
            });
          } else {
            res.sendStatus(401);
          }
        });
      });
    });
  }
});

app.post("/registrarse", async (request, response) => {
  let user = request.body.usuario;
  let pass = request.body.contraseña;
  let fname = request.body.nombre;
  console.log(request.body);
  let data = await db.collection("Tickets").findOne({ usuario: user });
  if (data == null) {
    try {
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(pass, salt, async (error, hash) => {
          let usuarioAgregar = {
            usuario: user,
            contraseña: hash,
            nombre: fname,
          };
          data = await db.collection("Tickets").insertOne(usuarioAgregar);
          response.sendStatus(201);
        });
      });
    } catch {
      response.sendStatus(401);
    }
  } else {
    response.sendStatus(401);
  }
});

app.get("/test", async (req, res) => {
  let data = await db
    .collection("test")
    .find({})
    .project({ _id: 0, id: 1, nombre: 1, materia: 1 })
    .toArray();
  res.set("Access-Control-Expose-Headers", "X-Total-Count");
  res.set("X-Total-Count", data.length);
  //this returns a promise, a promise is an object that represents a future value
  res.json(data);
});

app.delete("/test/:id", async (req, res) => {
  console.log(req.params.id);
  let data = await db.collection("test").deleteOne({ id: req.params.id });
  res.json(data);
});

app.listen(8000, () => {
  connectDB();
  console.log("Server is running on port 8000.");
}); // listen for requests on port 8000

//getList, getMany, getManyReference
app.get("/tickets", async (request, response) => {
  let data = await db
    .collection("Tickets")
    .find({})
    .project({ _id: 0 })
    .toArray();
  response.set("Access-Control-Expose-Headers", "X-Total-Count");
  response.set("X-Total-Count", data.length);
  response.json(data);
});

//getOne
app.get("/tickets/:id", async (req, res) => {
  let data = await db
    .collection("Tickets")
    .find({ id: Number(req.params.id) })
    .project({ _id: 0 })
    .toArray();
  res.json(data[0]);
});

//create
app.post("/tickets", async (request, response) => {
  let addValue = request.body;
  let data = await db.collection("Tickets").find({}).toArray();
  let id = data.length + 1;
  addValue["id"] = id;
  data = await db.collection("Tickets").insertOne(addValue);
  response.json(data);
});

//update
app.put("/tickets/:id", async (req, res) => {
  let addValues = req.body;
  addValues["id"] = Number(req.params.id);
  let data = await db
    .collection("Tickets")
    .updateOne({ id: addValues["id"] }, { $set: addValues });
  data = await db
    .collection("Tickets")
    .find({ id: Number(req.params.id) })
    .project({ _id: 0 })
    .toArray();
  res.json(data[0]);
});

//delete
app.delete("/tickets/:id", async (req, res) => {
  let data = await db
    .collection("Tickets")
    .deleteOne({ id: Number(req.params.id) });
  res.json(data);
});
