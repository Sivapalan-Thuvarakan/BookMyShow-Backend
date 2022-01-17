//Main Back endf file
const MoviesModel = require("./database/movies");
const UsersModel = require("./database/users");
require('dotenv').config();

const express = require("express");
var cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// _______________________Method 3( recommeded)__________________

//import the mongoose module
var mongoose = require('mongoose');
//setup the default monogoose connection
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log("Connection is established"));

app.get("/",(req,res)=>{
    return res.json({"Welcome":"Welcome to  backend software of BookMyShow"});
})

/*Route  /movies
Description Get all the movies
Access Public
Parameter NONE 
Methods   GET*/

//http://localhost:5000/movies
app.get("/movies",async(req,res)=>{
    const getAllMovies = await MoviesModel.find();
    return res.json(getAllMovies);
})

/*Route  /movies/:id
Description Get a movie
Access Public
Parameter NONE 
Methods   GET*/

//http://localhost:5000/movies/:id
app.get("/movies/:id",async(req,res)=>{
    const {id} = req.params;
    const getMovie = await MoviesModel.findOne({_id:id});
    return res.json(getMovie);
})

/*Route  /user-register
Description post a user details in user collection
Access Public
Parameter NONE 
Methods   POST*/

//http://localhost:5000/user-register
app.post("/user-register",async(req,res)=>{
    const addNewUser = await UsersModel.create(req.body);
    return res.json({userAdded: addNewUser, message : "User was added !!!"});
})

app.listen(process.env.PORT || 5000,()=>{
    console.log("My Express is working");
})