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
  let data = await db.collection("Users").findOne({ usuario: user });
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
              id : data._id,
              rol : data.rol,
              mail : data.mail,
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
  let rol = request.body.rol;
  let mail = request.body.mail;
  let id = request.body.id;
  console.log(request.body);
  let data = await db.collection("Users").findOne({ usuario: user });
  if (data == null) {
    try {
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(pass, salt, async (error, hash) => {
          let usuarioAgregar = {
            usuario: user,
            contraseña: hash,
            nombre: fname,
            rol : rol,
            mail : mail,
            id : id,
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
  //check user token
  console.log("request", request.query);
  try {
    let token = request.get("Authentication");
    
    let verify = await jwt.verify(token, "secretKey");
    let user = await db
      .collection("Users")
      .findOne({ usuario: verify.usuario });

    let findUser = {};
    if (request.query.finished === 'true') {
      findUser.finished = true;
    } else if (request.query.finished === 'false') {
      findUser.finished = { $ne: true };
    }
    if (user.rol == "coolaborador") {
      findUser["usuario"] = verify.usuario;}
    // } else if (user.rol == "nacional") {
    //   findUser["usuario"] = verify.usuario;
    // } else if (user.rol == "ejecutivo") {
    //   findUser["usuario"] = verify.usuario;
    // }
    if ("prioridad" in request.query) {
      // If "prioridad" is present in the query, filter by it
      console.log("Filtering by Prioridad:", request.query.prioridad);
      findUser["prioridad"] = request.query.prioridad;
    }
    if("id" in request.query){
      console.log("Filtering by ID:", request.query.id);
      findUser["id"] = Number(request.query.id);
      console.log("findUser de id ", findUser);
    }

    if ("_sort" in request.query){
      let sortBy=request.query._sort;
      console.log("sortBy", sortBy);
      let sortOrder=request.query._order=="ASC"?1:-1;
      console.log("sortOrder", sortOrder);
      let start=Number(request.query._start);
      console.log("start", start);
      let end=Number(request.query._end);
      console.log("end", end);
      let sorter={}
      sorter[sortBy]=sortOrder
      console.log("sorter", sorter);
      console.log("findUser", findUser);
      let data=await db.collection('Tickets').find(findUser).sort(sorter).project({_id:0}).toArray();
      // console.log("data", data);
      response.set('Access-Control-Expose-Headers', 'X-Total-Count')
      response.set('X-Total-Count', data.length)
      data=data.slice(start, end)
      response.json(data);
      console.log("data", data);
  }else if ("id" in request.query){
      let data=[]
      for (let index=0; index<request.query.id.length; index++){
          let dataObtain=await db.collection('Tickets').find({id: Number(request.query.id[index])}).project({_id:0}).toArray();
          data=await data.concat(dataObtain)
      }
      response.json(data);
  }else {
      let data=[]
      data=await db.collection('Tickets').find(request.query).project({_id:0}).toArray();
      response.set('Access-Control-Expose-Headers', 'X-Total-Count')
      response.set('X-Total-Count', data.length)
      response.json(data)
  }
}catch{
  response.sendStatus(401);
}
});

// app.get("/Tickets", async (request, response) => {
//   console.log("request", request.query._id);
//   try {
//       let token = request.get("Authentication");
//       let verifiedToken = await jwt.verify(token, "secretKey");
//       let authData = await db
//       .collection("Users")
//       .findOne({ usuario: verify.usuario });

//       let parametersFind = {};
//       if (authData.rol === "coolaborador") {
//           parametersFind["usuario"] = authData.usuario;
//       }

//       if ("prioridad" in request.query) {
//           // If "prioridad" is present in the query, filter by it
//           console.log("Filtering by Prioridad:", request.query.prioridad)
//           parametersFind["prioridad"] = request.query.prioridad;
//       }
//       if ("clasificacion" in request.query) {
//           // If "prioridad" is present in the query, filter by it
//           console.log("Filtering by Clasificacion:", request.query.clasificacion)
//           parametersFind["clasificacion"] = request.query.clasificacion;
//       }
//       if ("tipo" in request.query) {
//           // If "prioridad" is present in the query, filter by it
//           console.log("Filtering by Tipo:", request.query.tipo)
//           parametersFind["tipo"] = request.query.tipo;
//       }
//       if ("estatus" in request.query) {
//           // If "prioridad" is present in the query, filter by it
//           console.log("Filtering by Estatus:", request.query.estatus)
//           parametersFind["estatus"] = request.query.estatus;
//       }
//       if ("aula" in request.query) {
//           // If "prioridad" is present in the query, filter by it
//           console.log("Filtering by Estatus:", request.query.aula)
//           parametersFind["aula"] = request.query.aula;
//       }
//       if ("id" in request.query) {
//           // If "prioridad" is present in the query, filter by it
//           console.log("Filtering by ID:", request.query.id)
//           parametersFind["id"] = request.query.id;
//       }

//       // Determine where the endpoint is
//       if ("_sort" in request.query) { // list
//           let sortBy = request.query._sort;
//           let sortOrder = request.query._order === "ASC" ? 1 : -1;
//           let start = Number(request.query._start);
//           let end = Number(request.query._end);
//           let sorter = {};
//           sorter[sortBy] = sortOrder;

//           const total = await db.collection('Tickets').countDocuments(parametersFind);
//           response.set('Access-Control-Expose-Headers', 'X-Total-Count');
//           response.set('X-Total-Count', total);

//           const data = await db.collection('Tickets')
//               .find(parametersFind)
//               .sort(sorter)
//               .project({ _id: 0 })
//               .skip(start)
//               .limit(end - start)
//               .toArray();

//           response.json(data);
//       } else if ("id" in request.query) { // getMany
//           let data = [];
//           for (let index = 0; index < request.query.id.length; index++) {
//               let dataObtain = await db.collection('Tickets').find({ id: Number(request.query.id[index]) }).project({ _id: 0 }).toArray();
//               data = data.concat(dataObtain);
//           }
//           response.json(data);
//       } else { // getReference
//           let data = await db.collection('Tickets').find(parametersFind).project({ _id: 0 }).toArray();
//           response.set('Access-Control-Expose-Headers', 'X-Total-Count');
//           response.set('X-Total-Count', data.length);
//           response.json(data);
//       }
//   } catch {
//       console.error(error);
//       response.sendStatus(401);
//   }
// });

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
      // console.log("DATA", data)
    // log(verifiedToken.usuario, "ver objeto", request.params.id);
    response.json(data[0]);
    console.log("DATA[0]", data[0]);
  } catch {
    console.log("no se pudo");
    response.sendStatus(401);
  }
});

//create
app.post("/tickets", async (request, response) => {
  try{
    let token=request.get("Authentication");
    let verifiedToken = await jwt.verify(token, "secretKey");
    let addValue=request.body
    let data=await db.collection('Tickets').find({}).toArray();
    let id=data.length+1;
    addValue["id"]=id;
    addValue["usuario"]=verifiedToken.usuario;
    data=await db.collection('Tickets').insertOne(addValue);
    response.json(data);
}catch{
    response.sendStatus(401);
}
});

//update
app.put("/tickets/:id", async (request, response) => {
  try{
    let token=request.get("Authentication");
    let verifiedToken = await jwt.verify(token, "secretKey");
    let addValue=request.body
    addValue["id"]=Number(request.params.id);
    let data=await db.collection("Tickets").updateOne({"id": addValue["id"]}, {"$set": addValue});
    data=await db.collection('Tickets').find({"id": Number(request.params.id)}).project({_id:0, id:1, nombre:1, materia:1}).toArray();
    response.json(data[0]);
}catch{
    response.sendStatus(401);
}
});

//delete
app.delete("/tickets/:id", async (request, response) => {
  try{
    let token=request.get("Authentication");
    let verifiedToken = await jwt.verify(token, "secretKey");
    let data=await db.collection('Tickets').deleteOne({"id": Number(request.params.id)});
    response.json(data);
}catch{
    response.sendStatus(401);
}
});