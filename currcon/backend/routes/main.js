const express=require("express");
const Userrouter=require("./user");
const Accountrouter=require("./account");

const router=express.Router();

router.use("/person",Userrouter);
router.use("/balance",Accountrouter);

module.exports=router;