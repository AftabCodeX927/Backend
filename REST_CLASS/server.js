const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const { v4: uuidv4} = require( 'uuid');
const methodOvrride = require("method-override");

app.use(express.urlencoded({extended:true}));
app.use(methodOvrride("_method"));
app.use(express.json());

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views")); 
app.use(express.static(path.join(__dirname,"public"))); 

let posts = [
    {
        id: uuidv4(),
        username: "Aftab bro",
        content : "I love Coding",
    },
    {
        id: uuidv4(),
        username: "Salman khan",
        content : "i am a king",
    },
    {
        id: uuidv4(),
        username: "Sahruk khan",
        content : "I am a Bollywood star",
    },  
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.get("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post);
    res.render("show.ejs",{post});
    
});

app.post("/posts",(req,res)=>{
    let { username , content } = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect(303, "/posts");
});

app.patch("/posts/:id",(req, res)=>{
    let { id } = req.params;
    let { content } = req.body;
    let post = posts.find((p) => id === p.id);
    if (!post) {
        return res.status(404).send("Post not found");
    }
    if (typeof content !== "string") {
        return res.status(400).send("Post content is required");
    }
    post.content = content;
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.render("edit.ejs",{ post });
})

app.delete("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let postExists = posts.some((p) => id === p.id);
    if (!postExists) {
        return res.status(404).send("Post not found");
    }
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.listen(port,()=>{
    console.log(`server start on this port ${port}`);
});