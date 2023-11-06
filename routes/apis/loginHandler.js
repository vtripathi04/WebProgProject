const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();



router.get('/login', (req, res) => {

    loginPagehtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Clothon - Login</title>
      <style>
        
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f2f2f2;
        }
    
        .login-container {
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
          text-align: center;
          width: 300px;
        }
    
        .logo {
          margin-bottom: 20px;
        }
    
        .login-form input {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          box-sizing: border-box;
        }
    
        .login-form button {
          width: 100%;
          padding: 10px;
          background-color: grey;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: all ease 0.3s;
        }
    
        .login-form button:hover {
          background-color: black;
          
        }
    
      </style>
    </head>
    <body>
    
    <div class="login-container">
      <div class="logo">
        <img src="./images/final-logo.png" alt="Clothon Logo" width="300" height = "100">
      </div>
    
      <form class="login-form" action="/success">
        <input type="email" placeholder="Email" required>
        <input type="password" placeholder="Password" required>
        <button type="submit">Login</button>
      </form>
    </div>
    
    </body>
    </html>
    `;

    const filePath = path.join('C:/Users/Rituparna/OneDrive/Desktop/College 2nd Year/Web Prog/Final Project', 'public', 'loginpage.html');
    fs.writeFileSync(filePath, loginPagehtml);

    // Respond with the file
    res.sendFile(filePath);


});




router.get('/success', (req, res) => {

    res.send("User Logged In Successfully !");



});




module.exports = router;


