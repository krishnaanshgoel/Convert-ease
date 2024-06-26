const express=require("express");
const cors=require("cors");
const Rootrouter=require("./routes/main");
const app=express();
// app.use(cors());

app.use(express.json());

app.use("/",Rootrouter)

app.listen(process.PORT || 3000);
