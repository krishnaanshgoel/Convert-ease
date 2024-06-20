const express=require("express");
const router=express.Router();
const zod=require("zod");
const {Person,Wallet}=require("../db");
const {JWT_Secret}=require("../config");
const jwt=require("jsonwebtoken");
const authmiddleware=require("../middleware")

module.exports=router;
//sign up,sign in,update

const signupbody=zod.object({
    username:zod.string().email(),
    password:zod.string(),
    Firstname:zod.string(),
    Lastname:zod.string()
})

router.post("/signup",async (req,res)=>{
    const {success}=signupbody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg:"Incorrect iputs"
        })
    }
    const euser= await Person.findOne({
        username:req.body.username,
        password:req.body.password,
    })
    if(euser){
        return res.status(411).json({
            msg:"User exists"
        })
    }
    const user=await Person.create({
        username:req.body.username,
        password:req.body.password,
        Firstname:req.body.Firstname,
        Lastname:req.body.Lastname,
    })
    const userId=user._id;

    await Wallet.create({
        userId,
        totalbalance:0,
        USD:0,
        INR:0,
        AED:0,
        Pound:0,
    })
    const token=jwt.sign({
        userId,
    },JWT_Secret)

    return res.json({
        msg:"user created successfully",
        token:token
    })


})

const signinbody=zod.object({
    username:zod.string().email(),
    password:zod.string()
})

router.post("/signin",async (req,res)=>{
    const {success}=signinbody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            msg:"Incorrect inputs"
        })
    }
    const user=await Person.findOne({
        username:req.body.username,
        password:req.body.password
    })
    if(user){
        const token=jwt.sign({
        userId:user._id
        },JWT_Secret)

        return res.status(200).json({
            token:token
        })
    }
    res.status(411).json({
        msg:"error signing in"
    })

})

const updatebody=zod.object({
    username:zod.string().optional(),
    password:zod.string().optional(),
    Firstname:zod.string().optional(),
    LastName:zod.string().optional()
})

router.put("/update",authmiddleware,async (req,res)=>{
    const {success}=updatebody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    await Person.updateOne({_id:req.userId},req.body);
    res.status(200).json({
        message: "Updated successfully"
    })
})

router.get("/details",authmiddleware,async (req,res)=>{
    const user=await Person.findOne({
        _id:req.userId
    })
    if(!user){
        return res.status(411).json({msg:"user not found"})
    }
    return res.status(200).json({
        username:user.username,
        Firstname:user.Firstname,
        Lastname:user.Lastname,
        password:user.password
    })
})



module.exports=router;