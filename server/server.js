const path = require("path"); //path is build in
const express = require("express"); //the NODE way to import something, with require
const app = express();
const publicPath = path.join(__dirname,"..", "public");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath)); //setting up/registering middleware

app.get("*", (req, res)=>{ //request response
    res.sendFile(path.join(publicPath, "index.html"));
}); //to match all unmatched routes

app.listen(port, ()=>{
    console.log("Express server running ")
}); //port express is going to use