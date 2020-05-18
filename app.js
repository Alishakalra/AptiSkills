const express = require("express");

const app = express();

const bodyParser =  require("body-parser");

const mongoose =  require("mongoose");

const _ = require("lodash");

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/aptiSkillsDB", {useNewUrlParser:true,useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("connected");
});

const signinSchema = mongoose.Schema(
  {
    firstName : String,
    lastName : String,
    email : String,
    username : String,
    password : String,
    gender : Number,
    companyName : String,
    profession : String
  }
);

const SignIn = mongoose.model("Signin", signinSchema);






app.get("/",function(req, res){
  res.render("index.ejs");
});
app.get("/homesignin",function(req, res){
  res.render("homeSignin.ejs");
});


app.get("/signin",function(req, res){
  res.render("signin.ejs");
});

app.get("/signUp",function(req, res){
  res.render("signUp.ejs");
});
app.get("/practise.html",function(req, res){
  res.sendFile(__dirname+"/practise.html");
});


app.get("/logical.html",function(req, res){
  res.sendFile(__dirname+"/logical.html");
});
app.get("/verbal.html",function(req, res){
  res.sendFile(__dirname+"/verbal.html");
});
app.get("/aptitude.html",function(req, res){
  res.sendFile(__dirname+"/aptitude.html");
});
app.get("/trains.html",function(req, res){
  res.sendFile(__dirname+"/trains.html");
});


app.get("/analogies",function(req, res){
  res.render("analogies.ejs");
});





app.post("/signUp",function(req, res){
  const firstName = req.body.firstName;
    const lastName = req.body.lastName;
  const email = req.body.email;
    const username = req.body.username;
  const password = req.body.password;
  const gender = req.body.gender;
    const companyName = req.body.companyName;
      const profession = req.body.profession;
  const signInInfo = new SignIn({
    firstName : firstName,
    lastName : lastName,
    email : email,
    username : username,
    password : password,
    gender : gender,
    companyName : companyName,
    profession : profession
  });
  signInInfo.save();
  console.log("saved");
  res.redirect("/");


});

app.post("/signin",function(req, res){
  const username = req.body.username;
const password = req.body.password;

SignIn.findOne({username : username, password : password},function(err, foundusername){


    if(!foundusername){

      console.log("account not found");
      // window.alert("ok");
    }
    else{

      console.log("account found");
      res.redirect("/homeSignin");
    }
  });
});

app.listen(3000,function(){
  console.log("Server is running...");
});
