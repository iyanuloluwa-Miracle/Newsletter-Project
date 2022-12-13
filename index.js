const express = require('express');
const bodyParser = require('body-parser');
const request = require('request')

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}))


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html' )
    
});

app.post('/', (req, res) => {
 var firstName = req.body.fname;
 var lastName = req.body.fpassword;
 var email = req.body.fmail;
 console.log(firstName,lastName,email)   
});

app.listen(3000, () => {
  console.log('server started');
});


//ac73051e240c73e758cccb3ac8784b36-us21