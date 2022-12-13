const express = require('express');
const bodyParser = require('body-parser');
const request = require('request')
const https = require('https')

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}))


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html' )
    
});

app.post('/', (req, res) => {
 const firstName = req.body.fname;
 const lastName = req.body.fpassword;
 const email = req.body.fmail;
 //console.log(firstName,lastName,email)
  const data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName,
        }
        
      }
    ]
  }
  const jsonData = JSON.stringify(data);
  const url = 'https://us21.api.mailchimp.com/3.0/lists/a2065952bb';
  const options={
    method:"POST",
    auth:"iyanu:0edfe53f379d69fc3a3854db914d8450-us21"
  }
  //console.log(url)

  const request = https.request(url,options, function(response){

    if(response.statusCode === 200){
      res.sendFile(__dirname + '/success.html')
    }else{
      res.sendFile(__dirname + '/failure.html')
    }
    response.on("data", function(data){
      console.log(JSON.parse(data))
    })
    
  })
  request.write(jsonData)
  request.end()
  
});


app.post('/failure', function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, () => {
  console.log('server started');
});

