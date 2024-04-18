// since we cannont connect to database using node or express 
//so we have to install packages through which we can connect to our database,
// one package is mongoose and other is mongodb
// but mongoose is more advance 
import mongoose from "mongoose";


import dotenv from "dotenv"
// // to initaialise dotenv
dotenv.config();
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;


// mongoose.set('strictQuery', true);


const Connection = async () => {

    const URL =    `mongodb+srv://${USERNAME}:${PASSWORD}@medicalrecords.pvkmdxg.mongodb.net/?retryWrites=true&w=majority&appName=MedicalRecords`
        // we need to do error handling since mongodb is not inside our project 
        // mongodb is on aws cloud environment
        // so  if there is problem on cloud side or server down we have to take care
    try {

        // mongoose give us a function name connect which can be used to connect to mongodb
        // its first argument is url which is url of mondodb database you want to connect
        // second argument is its object where we can pass our argument.
        // since mongodb is running on cloud server we have to wait till it gets fully connected so use await
        await mongoose.connect(URL, { useUnifiedTopology: true });

        console.log("database connected successfully")
    } catch (error) {
    
        console.log("error while connecting with database", error.message);
    }
}

export default Connection;
