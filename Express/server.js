const express = require("express");
const app = express();
let port = 3000;


app.listen(port,()=>{
    console.log(`my server start on this http://localhost:3000`)
});

app.use((req,res)=>{
    console.log("new incoming request");
    // res.send("this is demo");
    // res.send({
    //     name: 'Aftab',
    //     color: 'white',
    //     age: 22
    // });
    let code = "<h1>Fruits<h1><ul><li>apple</li><li>banana</li><li>mango</li><ul>";
    res.send(code);
});