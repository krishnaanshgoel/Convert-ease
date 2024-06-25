
const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://kgoel1932005:Kg1932005@cluster0.xvpxtfs.mongodb.net/");

const personSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:6,
        maxLength:50,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        minLength:3,
        required:true
    },
    Firstname:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    Lastname:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    }

})

const Person=mongoose.model("Person",personSchema);


const walletSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Person',
        required:true
    },
    totalbalance:{
        type:Number,
        required:true
    },
    USD:{
        type:Number,
        required:false
    },
    INR:{
        type:Number,
        required:false
    },
    Pound:{
        type:Number,
        required:false
    },
    AED:{
        type:Number,
        required:false
    }
})


const Wallet=mongoose.model("Wallet",walletSchema);

module.exports={Person,Wallet};