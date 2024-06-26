const express=require("express");
const cors=require("cors");
const Rootrouter=require("./routes/main");
const app=express();
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://convert-ease-nine.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://convert-ease-nine.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

app.use(express.json());

app.use("/",Rootrouter)

app.listen(process.PORT || 3000);
