const mongoose=require("mongoose");
const { type } = require("os");


const chatSchema=new mongoose.Schema({
    to:{
        type:String,
        required: true
    },
    from:{
         type:String,
        required: true
    },
    msg:{
         type:String,
    },
    date:{
        type : Date
    }

})

const chat=mongoose.model("chat",chatSchema);

module.exports=chat;

