const express = require("express"); 
const app = express();
const path = require("path");

const port = 3000;

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/",(req,res)=>{
    res.render("home.ejs");
});

app.get("/ig/:username",(req,res)=>{
    // const followers = ["Adam","Vinay","Rahul","Akansha","Great Khali","Rock Lessaner"];
    // res.render("instagram.ejs",{username, followers});
    let { username } = req.params;

    const InstaData = require("./data.json")
    const data = InstaData[username];
    if(data){
        res.render("instagram.ejs",{data});
    } else(
        res.render("error.ejs",{data})
    )
    
});


app.get("/rolldice",(req,res)=>{
    let diceValue = Math.floor(Math.random()* 6) + 1;
    res.render("rollDice.ejs",{ diceValue });
});

app.listen(port,()=>{
    console.log(`my server start on this port http://localhost:3000/`);
})