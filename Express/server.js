const express = require("express");
const app = express();
let port = 3000;


app.get("/",(req, res)=>{
    res.send("you contacted root path");
});

app.get("/help",(req, res)=>{
    res.send("you contacted help path");
});


app.get("/samosa",(req, res)=>{
    res.send("ye lo garma-garam samosa");
});

app.post("/",(req, res)=>{
    res.send("You send a post request to root");
});

// path parameter
app.get("/:username/:id",(req, res)=>{
    let {username , id} = req.params;
    let htmlStr = `<h1>Welcome to the page of @${username}.</h1>`;
    res.send(htmlStr);
});

// query String
app.get("/search",(req, res)=>{
    let {q} = req.query;
    if(!q){
        res.send(`<h1>nothing searches</h1>`);
    }
    res.send(`<h1>search result for query: ${q}</h1>`);

});


app.get("/*splat",(req, res)=>{
    res.send("This page does not exist");
});

// app.use((req,res)=>{
    //     console.log("new incoming request");
    //     // res.send("this is demo");
    //     // res.send({
        //     //     name: 'Aftab',
        //     //     color: 'white',
        //     //     age: 22
        //     // });
        //     let code = "<h1>Fruits<h1><ul><li>apple</li><li>banana</li><li>mango</li><ul>";
        //     res.send(code);
        // });

app.listen(port,()=>{
    console.log(`my server start on this http://localhost:3000`)
});