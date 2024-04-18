import express from "express";

import {addRecord,getRecord} from "../controller/record-controller.js"


const route=express.Router();

// add is endpoint which will be hit
// second argument tells what to do when this endpoint is hit
// here we want to save data

// data coming from client side withn axios.post will be passed to function addUser in request 

route.post("/addrecord",addRecord);
route.get("/getrecord",getRecord);
export default route;