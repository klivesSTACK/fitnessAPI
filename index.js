//import express library/package
const express = require("express");

//import mongoose connection
const mongoose = require("mongoose");

//import cors library/package
const cors = require("cors");

//import .env
require('dotenv').config();

//Routes Middleware
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

const app = express();
//parses incoming requests with JSON payloads
app.use(express.json());
//reads json object
app.use(express.urlencoded({ extended: true }));

//setup cors
const corsOptions = {

    //client/Frontend application URL
    origin: [
        'http://localhost:3000',
        'https://fitness-client-mm6zs8cm0-larrys-projects-8f15cfd4.vercel.app'],
    // Allow only specified headers
    credentials: true,
    // Allow only specified HTTP methods
    optionsSuccessStatus: 200

}

app.use(cors(corsOptions));

app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

//setup mongoose database connection
mongoose.connect(process.env.MONGODB_STRING);
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
	});
}

module.exports = {app,mongoose};