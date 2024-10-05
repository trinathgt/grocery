//  server.js


const express = require('express');
const path = require('path');
const app = express();

const nodemailer = require("nodemailer");
const PORT = process.env.PORT || 5500;
//Middleware
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json())

app.get('/',(req,res)=>
{
  res.sendFile(path.join(__dirname, 'public','index.html'));
})

app.post('/',(req,res)=>{
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: 'gmail', // Example with Gmail; use your email service provider
auth: {
 user: 'anushrao9866@gmail.com', // Replace with your email 
    pass: 'ctbmcrxkswrtgmrf', 

  }})

  const mailOptions = {
        from: req.body.email,
        to: 'anushrao9866@gmail.com', // Replace with your email where you want to receive the form data
        subject: `New contact form submission from ${req.body.email}`,
        text: `You have received a new message from myPortfolio ${req.body.name}\n\n (${req.body.email}):\n\n${req.body.message}`,
      }

      transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
          console.log(error);
          res.send('error');
        }
        else{
          console.log('Email sent: '+ info.response);
          res.send('success')
        }
      })
})

app.listen(PORT,()=>{
  console.log(`Server running on http://localhost:${PORT}`)
})