const express=require("express");
const { default: mongoose } = require("mongoose");
const app=express();
const path=require("path");
const chat=require("./models/chat.js")
const methodOverride=require("method-override");

const port=8080;


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

// let chat1=new chat({
//     to:"virat",
//     from:"Dhoni",
//     msg:"How are You",
//     date:new Date(),
// })

// chat1.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })


async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main().then((res)=>{
    console.log("Connection succesful");
})
.catch((err)=>{
    console.log(err);
})


app.get("/",(req,res)=>{
    res.send("Hello welcome to my web");
})


app.get("/chats",async (req,res)=>{
    let data=await chat.find();
    console.log(data);
    res.render("index.ejs",{data});
})

app.get("/chats/get",(req,res)=>{
    res.render("newchat.ejs");
})

app.post("/chats",(req,res)=>{
  let {from,msg,to}=req.body;
  let newchat=new chat({
    from:from,
    msg:msg,
    to:to,
    created_at:new Date(),
  })
  newchat.save().then((res)=>{
    console.log("New Chat Inserted Succesfully");
  }).catch((err)=>{
    console.log(err);
  })
  console.log(newchat);
  res.redirect("/chats");
})


//EDIT ROUTE

app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let result= await chat.findById(id);
    res.render("edit.ejs",{chats: result});
})


//UPDATE ROUTE 
app.put("/chats/:id",async (req,res)=>{
        let {id}=req.params;
        let {msg: newmessage}=req.body;
        let updatedchat= await chat.findByIdAndUpdate(id,
            {msg:newmessage},
            {runValidators : true,new : true}
        );
        res.redirect("/chats");

})

//DELETE ROUTE
app.delete("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let deletedchat=await chat.findByIdAndDelete(id);
    res.redirect("/chats");
    console.log(deletedchat);


})

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})