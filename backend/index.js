import cors from "cors";
import express from "express";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



let db; 
const app = express(); // create express app, executes functions 
app.use(cors());

async function  connectDB(){
    let client = new MongoClient("mongodb://localhost:27017/ticket_system");
    await client.connect();
    db = client.db();
    console.log("Database connected.");
}

// Endpoint to login Frontend
app.post("/login", async (req, res) => {

  let usuario = req.body.usuario;
  let contrasena = req.body.contrasena;
  let data = await db.collection("Usuarios").find({"usuario": usuario}).project({_id:0}).toArray();
  if (data.length == 0){
    res.json({"error": "Usuario no encontrado."});

  }
  else{
    bcrypt.compare(contrasena, data[0].contrasena, (err, result) => {
      if (result){
        let token  = makeNewToken(data.usuario);
        response.json({"token": token, "usuario": data.usuario,  "nombre": data.nombre, rol: data.rol}) 
      }
      else{
        response.sendStatus(401)
      }
    });
  }
});







app.get("/test", async(req, res) => {
    let data = await db.collection("test").find({}).project({_id:0,id:1,nombre:1,materia:1}).toArray();
    res.set('Access-Control-Expose-Headers', 'X-Total-Count')
    res.set('X-Total-Count', data.length)
    //this returns a promise, a promise is an object that represents a future value
    res.json(data);
} )

app.delete("/test/:id", async(req, res) => {
    console.log(req.params.id);
    let data = await db.collection("test").deleteOne({"id": req.params.id});
    res.json(data);;
})


app.listen(8000, () => {
    connectDB();
    console.log("Server is running on port 8000.")
}) // listen for requests on port 8000

//getList, getMany, getManyReference
app.get("/tickets", async (request, response)=>{
    if ("_sort" in request.query){
        let sortBy=request.query._sort;
        let sortOrder=request.query._order=="ASC"?1:-1;
        let start=Number(request.query._start);
        let end=Number(request.query._end);
        let sorter={}
        sorter[sortBy]=sortOrder
        let data=await db.collection('Tickets').find({}).sort(sorter).project({_id:0}).toArray();
        response.set('Access-Control-Expose-Headers', 'X-Total-Count')
        response.set('X-Total-Count', data.length)
        data=data.slice(start, end)
        response.json(data);
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
  })
  
  //getOne
  app.get("/tickets/:id", async (req, res) => {
    let data = await db.collection("Tickets").find({"id": Number(req.params.id)}).project({_id:0}).toArray();
    res.json(data[0]);
  })
  
  //create
  app.post("/tickets", async (request, response)=>{
    let addValue=request.body
    let data=await db.collection('Tickets').find({}).toArray();
    let id=data.length+1;
    addValue["id"]=id;
    data=await db.collection('Tickets').insertOne(addValue);
    response.json(data);
  }) 
  
  //update
  app.put("/tickets/:id", async (req, res) => {
    let addValues = req.body;
    addValues["id"] = Number(req.params.id);
    let data = await db.collection("Tickets").updateOne({id: addValues["id"]}, {"$set":addValues});
    data = await db.collection("Tickets").find({"id": Number(req.params.id)}).project({_id:0}).toArray();
    res.json(data[0]);
  })
  
  
  //delete
  app.delete("/tickets/:id", async (req, res) => {
    let data = await db.collection("Tickets").deleteOne({id: Number(req.params.id)})
    res.json(data);
  })