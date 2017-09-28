var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
var session = require('express-session');
app.use(session({secret: 'tired',resave: true,saveUninitialized : false}));
 
 iam
 
app.use(express.static(__dirname));
 
app.post('/datain', function (req, res) {
   var data = fs.readFileSync("users.json");
   
   var data2 = JSON.parse(data);
  res.json(data2[req.session.ID]);
})
 
 app.post('/dataout', function (req, res) {
  var content = fs.readFileSync("users.json");
   var data = JSON.parse(content);
    console.log(data);
  console.log(req.body.alltasks);
   data[req.session.ID].alltasks = JSON.parse(req.body.alltasks);
   console.log(data[req.session.ID].alltasks);
   data[req.session.ID].progtask = JSON.parse(req.body.progtask);
   data[req.session.ID].comptask = JSON.parse(req.body.comptask);
   data[req.session.ID].archtask = JSON.parse(req.body.archtask);
   fs.writeFileSync("users.json",JSON.stringify(data,null,4));
})
app.post('/toDoList', function (req, res) {

var temp = new Object();
temp.name = req.body.email4;
temp.password = req.body.password4 ;
 
 
  
  var jas=[];var  flag = 0;
  var data = fs.readFileSync( "users.json");
 
  // function (err, data) {
       jas = JSON.parse( data );
              console.log("lolo");
 
       // console.log(jas[0].email);
       for(var i in jas)
       {
 
          if( req.body.email4 === jas[i].email && req.body.password4 === jas[i].password ){
              console.log("done two");
              console.log(jas[i].email);
              flag = 1 ;
        req.session.ID = i;
        
          }
 
                  if (flag === 1)
         {        
  req.session.myUserEmail = req.body.email4;
   res.sendFile( __dirname + "/" + "final.html");
}
 
                 console.log(jas[i].email);
 
        }
 
 
// }
 
 
        if (flag === 0 ) {
 
          res.redirect('/interface.html');
 
 
 
 
       }
 
 
 
 })
app.get('/interface',function(req,res){
  if(req.session.myUserEmail) {
    res.sendFile( __dirname + "/" + "final.html");
} else {
  res.sendFile( __dirname + "/" + "interface.html");
}
  
 
 
});
 
app.get('/',function (req,res) {
  if(req.session.myUserEmail) {
    res.sendFile( __dirname + "/" + "final.html");
} else {
  res.redirect('/interface');
}
  
})
 
 
app.post('/addUser', function (req, res) {

var user = new Object();
user.name =req.body.name3;
user.email = req.body.email3;
user.password = req.body.password3;
 user.alltasks = [];
 user.progtask = [];
 user.comptask = [];
 user.archtask = [];
 
 
 
  var jas={};
  var  flag = 0;
var data = fs.readFileSync("users.json");
 
 // function (err, data) {
 
       jas = JSON.parse( data );
 
       for(var i in jas)
       {      
          // console.log(jas[i].email); //ERROR cant read email property for undefined
 
 
          if(  jas[i].email === req.body.email3){  ////////////////// heeeeeeeeeeeeeeeeereeeeeeeee
        
              flag = 1 ;
  console.log('error');
 
          }
                       //  console.log(user.email);//gives the email
                       // console.log(req.query.email3); // gives the email
 
 
        }
 
 
// };
 
 
        if (flag === 0 ) {
      jas.push(user);
            
             console.log('ana henaa');
            
             
       req.session.myUserEmail = req.body.email3;
       req.session.ID = jas.length - 1;
jas = JSON.stringify(jas,null,4);
             //fs.appendFile
              fs.writeFileSync("users.json", jas);    
              res.sendFile( __dirname + "/" + "final.html");
             // res.end( data );
 
 
 
       } else {
       res.redirect('/interface');
     }

 
 })
 app.post('/getout' , function (req,res) {
  delete req.session.myUserEmail;
  delete req.session.ID;
    res.redirect('/interface');
 })
var server = app.listen(8081, function () {
var host = server.address().address
var port = server.address().port
console.log("Example app listening at http://%s:%s", host, port)
})