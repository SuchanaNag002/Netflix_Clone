const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.route("/")
.get((req,res)=>{
  res.sendFile(path.join(__dirname, '/index.html'));
})
.post((req,res)=>{
  var email = req.body.email;
  var password = req.body.password;
  s = "https://arcane-garden-27567.herokuapp.com/login/" + email +"/" + password;
  https.get(s,(response)=>{
    response.on('data', (data)=>{
      const loginInfo = JSON.parse(data);
      console.log(loginInfo);
      if (!loginInfo.email){
        res.send("Wrong Email! Please Enter the Correct Email Or Sign Up for Free!");
      } else {
        if (!loginInfo.password) res.send("Wrong password! Please Enter Correct Password");
        else res.send("MAIN PAGE");
      }
    });
  });

})





app.listen(3000, ()=>{
  console.log("Server Running on Port 3000");
} );
