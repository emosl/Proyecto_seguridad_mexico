//Equipo 1: Emilia Salazar, Ian Holender, Fernanda Osorio, Rafael Blanga, Martin Palomares
//Octubre 2023
//Integración de seguridad informática en redes y sistemas de software 

//imports from cors, express, mongodb, body-parser, bcrypt, jsonwebtoken, https and fs
import cors from "cors";
import express from "express";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import https from "https";
import fs from "fs"; 

//declarations of the variables
const uri = "mongodb+srv://Emo123:Emo123@ticketsystem.z9f1jjv.mongodb.net/";
let db;
const app = express();
app.use(cors());
app.use(bodyParser.json());
const client = new MongoClient(uri);

//function to connect to the database
async function connectDB() {
  try {
    await client.connect();
    db = client.db("ticket_system");
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
}
connectDB();


// ENDPOINTS

//POST for login
app.post("/login", async (req, res) => {
  //Get User Credentials
  console.log(req.body);
  let user = req.body.usuario;
  let pass = req.body.contraseña;
  let data = await db.collection("Users").findOne({ usuario: user });
  if (data == null) {
    console.log("")
    res.sendStatus(401);
  } else {
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(pass, salt, async (error, hash) => {
        //compare hashed password with the one in the database
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
              id: data._id,
              rol: data.rol,
              mail: data.mail,
            });
          } else {
            res.sendStatus(401);
          }
        });
      });
    });
  }
});

//POST for register
//not available in the frontend
app.post("/registrarse", async (request, response) => {
  let user = request.body.usuario;
  let pass = request.body.contraseña;
  let fname = request.body.nombre;
  let rol = request.body.rol;
  let mail = request.body.mail;
  let id = request.body.id;
  console.log(request.body);
  let data = await db.collection("Users").findOne({ usuario: user });
  if (data == null) {
    try {
      //encrypt password
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(pass, salt, async (error, hash) => {
          let usuarioAgregar = {
            usuario: user,
            contraseña: hash,
            nombre: fname,
            rol: rol,
            mail: mail,
            id: id,
          };
          data = await db.collection("Users").insertOne(usuarioAgregar);
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

//GET tests
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

//DELETE tests by id
app.delete("/test/:id", async (req, res) => {
  console.log(req.params.id);
  let data = await db.collection("test").deleteOne({ id: req.params.id });
  res.json(data);
});

//GET for Tickets depending on the user role
//getList, getMany, getManyReference
app.get("/tickets", async (request, response) => {
  //check user token
  console.log("request", request.query);
  try {
    let token = request.get("Authentication");

    let verify = await jwt.verify(token, "secretKey");
    let user = await db
      .collection("Users")
      .findOne({ usuario: verify.usuario });

    let findUser = {};
    if (user.rol == "coolaborador") {
      findUser["usuario"] = verify.usuario;
    }

    //BACKEND FILTERS
    // } else if (user.rol == "nacional") {
    //   findUser["usuario"] = verify.usuario;
    // } else if (user.rol == "ejecutivo") {
    //   findUser["usuario"] = verify.usuario;
    // }
    // if ("prioridad" in request.query) {
    //   // If "prioridad" is present in the query, filter by it
    //   console.log("Filtering by Prioridad:", request.query.prioridad);
    //   findUser["prioridad"] = request.query.prioridad;
    // }
    // if ("id" in request.query) {
    //   console.log("Filtering by ID:", request.query.id);
    //   findUser["id"] = Number(request.query.id);
    //   console.log("findUser de id ", findUser);
    // }
    // if ("clasificacion" in request.query) {
    //   // If "prioridad" is present in the query, filter by it
    //   console.log("Filtering by Clasificacion:", request.query.clasificacion);
    //   findUser["clasificacion"] = request.query.clasificacion;
    // }

    //sorting according to the query
    if ("_sort" in request.query) {
      let sortBy = request.query._sort;
      console.log("sortBy", sortBy);
      let sortOrder = request.query._order == "ASC" ? 1 : -1;
      console.log("sortOrder", sortOrder);
      let start = Number(request.query._start);
      console.log("start", start);
      let end = Number(request.query._end);
      console.log("end", end);
      let sorter = {};
      sorter[sortBy] = sortOrder;
      console.log("sorter", sorter);
      console.log("findUser", findUser);
      let data = await db
        .collection("Tickets")
        .find(findUser)
        .sort(sorter)
        .project({ _id: 0 })
        .toArray();
      // console.log("data", data);
      response.set("Access-Control-Expose-Headers", "X-Total-Count");
      response.set("X-Total-Count", data.length);
      data = data.slice(start, end);
      response.json(data);
      console.log("data", data);
    } else if ("id" in request.query) {
      let data = [];
      for (let index = 0; index < request.query.id.length; index++) {
        let dataObtain = await db
          .collection("Tickets")
          .find({ id: Number(request.query.id[index]) })
          .project({ _id: 0 })
          .toArray();
        data = await data.concat(dataObtain);
      }
      response.json(data);
    } else {
      //get all tickets
      let data = [];
      data = await db
        .collection("Tickets")
        .find(request.query)
        .project({ _id: 0 })
        .toArray();
      response.set("Access-Control-Expose-Headers", "X-Total-Count");
      response.set("X-Total-Count", data.length);
      response.json(data);
    }
  } catch {
    response.sendStatus(401);
  }
});


//GET for Tickets depending on the user role and id
//getOne
app.get("/tickets/:id", async (request, response) => {
  try {
    console.log("request id", request.params);
    let token = request.get("Authentication");
    // console.log("TOCKEN", token);
    let verifiedToken = await jwt.verify(token, "secretKey");
    // console.log("VERIFIED", verifiedToken);
    let authData = await db
      .collection("Users")
      .findOne({ usuario: verifiedToken.usuario });
    let parametersFind = { id: Number(request.params.id) };
    // console.log("AUTHDATA", authData);
    if (authData.permissions == "coolaborador") {
      parametersFind["usuario"] = verifiedToken.usuario;
    }
    let data = await db
      .collection("Tickets")
      .find(parametersFind)
      .project({ _id: 0 })
      .toArray();
    response.json(data[0]);
    console.log("DATA[0]", data[0]);
  } catch {
    console.log("no se pudo");
    response.sendStatus(401);
  }
});

//create
//POST for Tickets
app.post("/tickets", async (request, response) => {
  try {
    //check user token
    let token = request.get("Authentication");
    let verifiedToken = await jwt.verify(token, "secretKey");
    let addValue = request.body;
    let data = await db.collection("Tickets").find({}).toArray();
    let id = data.length + 1;
    addValue["id"] = id;
    addValue["usuario"] = verifiedToken.usuario;
    data = await db.collection("Tickets").insertOne(addValue);
    response.json(data);
  } catch {
    response.sendStatus(401);
  }
});

//update
//PUT for Tickets
app.put("/tickets/:id", async (request, response) => {
  try {
    //check user token
    let token = request.get("Authentication");
    let verifiedToken = await jwt.verify(token, "secretKey");
    let addValue = request.body;
    //modify ticket with id and addValue
    addValue["id"] = Number(request.params.id);
    let data = await db
      .collection("Tickets")
      .updateOne({ id: addValue["id"] }, { $set: addValue });
    data = await db
      .collection("Tickets")
      .find({ id: Number(request.params.id) })
      .project({ _id: 0, id: 1, nombre: 1, materia: 1 })
      .toArray();
    response.json(data[0]);
  } catch {
    response.sendStatus(401);
  }
});

//delete
//DELETE for Tickets by id
app.delete("/tickets/:id", async (request, response) => {
  try {
    //check user token
    let token = request.get("Authentication");
    let verifiedToken = await jwt.verify(token, "secretKey");
    let data = await db
      .collection("Tickets")
      .deleteOne({ id: Number(request.params.id) });
    response.json(data);
  } catch {
    response.sendStatus(401);
  }
});

//create a server that listens on port 8000
https.createServer({cert: fs.readFileSync("./backend.cer"), key: fs.readFileSync("./backend.key")}, app).listen(8000, ()=>{
  connectDB();
  console.log("Servidor escuchando en puerto 8000")
})

//Port 8000
//Conect to the database
app.listen(8000, () => {
  connectDB();
  console.log("Server is running on port 8000.");
}); // listen for requests on port 8000

