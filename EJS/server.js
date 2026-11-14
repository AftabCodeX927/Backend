const express = require("express"); 
const app = express();
const path = require("path");

const port = 3000;

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/",(req,res)=>{
    res.render("home.ejs");
});

app.get("/ig/:username",(req,res)=>{
    let { username } = req.params;
    res.render("instagram.ejs",{username});
    
})


app.get("/rolldice",(req,res)=>{
    let diceValue = Math.floor(Math.random()* 6) + 1;
    res.render("rollDice.ejs",{ diceValue });
});

app.listen(port,()=>{
    console.log(`my server start on this port http://localhost:3000/`);
})