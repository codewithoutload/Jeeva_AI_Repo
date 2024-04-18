// we will creating server of Express so we need to import express
// in older nodejs we can import express as-->
// --> const express=require('express')
// but now node js has ES6 syntax so we can directly write as import statement as folllows
import express from "express";
import bodyParser from "body-parser";
import Connection from "./database/db.js";

import Route from "./routes/route.js";
// creating app
const app=express();
import cors from "cors";
app.use(cors());


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
Connection();


const PORT=8000;

app.use('/',Route);

// creating server for express app
app.listen(PORT,()=>{
    console.log(`server started on PORT ${PORT}`);
});
