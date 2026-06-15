const mongoose=require("mongoose");
const chat=require("./models/chat.js");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main().then((res)=>{
    console.log("Success");
}).catch((err)=>{
    console.log(err);
})

let allchat=[
    {
       to:"virat",
    from:"Dhoni",
    msg:"How are You",
    date:new Date(),  
    },
    {
         to:"virat",
    from:"rohit",
    msg:"How are You",
    date:new Date(),
    },
    {
         to:"rohit",
    from:"ritika",
    msg:"How are You",
    date:new Date(),
    },
    {
         to:"virat",
    from:"anushka",
    msg:"How are You",
    date:new Date(),
    },

    {
         to:"hardik",
    from:"natasha",
    msg:"How are You",
    date:new Date(),
    }
]


chat.insertMany(allchat);

