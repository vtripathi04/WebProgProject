const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const connection = require('../../db'); // Import the database connection
const session = require('express-session');
const { connect } = require('http2');



// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
      return next();
  } else {
      res.redirect('/login');
  }
};

// Middleware to check if a user is not logged in (for the login and registration pages)
const isNotAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.user) {
      return next();
  } else {
      res.redirect('/');
  }
};


// Session configuration
router.use(session({
  secret: 'l#Jf$2sPqH@xG&*nLmK!oIzF',
  resave: true,
  saveUninitialized: true
}));



router.get('/login', (req, res) => {


    // Check if a user is already logged in
    if (req.session.user) {
      // User is already logged in
      res.write("User is already logged in !\n\nYou must Logout First");
      return res.end();
    }

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
    
      <form class="login-form" action="/login" method="post">
        <input type="email" name="email" placeholder="Email" required>
        <input type="password" name="password" placeholder="Password" required>
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



// Login post route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validate user credentials against the database
  const query = 'SELECT * FROM users WHERE useremail = ? AND password = ?';
  const values = [email, password];

  // console.log("Got user details !");

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error fetching user:', error);
      res.redirect('/login'); // Redirect back to login on error
      return;
    }

    const user = results[0];

    if (user) {
      req.session.user = user; // Set user in session
      console.log(user);
      res.redirect('/success'); // Redirect to dashboard on successful login
    } else {
      res.redirect('/login'); // Redirect back to login on failed login
    }
  });
});



router.get('/register', (req, res) => {

  regPagehtml = `
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
    
      <form class="login-form" action="/register" method="post">
        <input type="text" name="usrname" placeholder="Username" required>
        <input type="email" name="email" placeholder="Email" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Register</button>
      </form>
    </div>
    
    </body>
    </html>
    `;

    const filePath = path.join('C:/Users/Rituparna/OneDrive/Desktop/College 2nd Year/Web Prog/Final Project', 'public', 'registrationpage.html');
    fs.writeFileSync(filePath, regPagehtml);

    // Respond with the file
    res.sendFile(filePath);


});



router.post('/register', (req, res) => {

  const { usrname, email, password } = req.body;

  // Validate user credentials against the database
  const query = 'SELECT * FROM users WHERE useremail = ? AND password = ?';
  const allusers = 'SELECT * from users;';
  const values = [email, password];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error fetching user:', error);
      res.redirect('/login'); // Redirect back to login on error
      return;
    }

    const usr = results[0];

    if (usr) {  
      res.send('User Already Exists !');
      return;
    } else {
      connection.query(allusers, (error, results) => {
        if (error) {
          console.error('Error fetching userlist:', error);
          res.redirect('/register'); // Redirect back to login on error
          return;
        }

        const usrcnt = results.length + 1;
        console.log(usrcnt);

        const usrid = "U" + String(usrcnt);
        const makeuser = "INSERT INTO users VALUES (?, ?, ?, ?);";
        const insertValues = [usrid, usrname, email, password];

        connection.query(makeuser, insertValues, (error, results) => {
          if (error) {
            console.error('Couldnt create user :', error);
            res.redirect('/register'); // Redirect back to register page on error
            return;
          }

          res.send("You are registered now !");
          
        });
      });
    }
  });
});




router.post('/addtocart', (req, res) => {

    const { prodid }  = req.body;
    const userid = req.session.user.userid;
    console.log(prodid);
    console.log(userid);

    query = "SELECT * FROM user_carts where user_id = ? and product_id = ?";
    values = [userid, prodid];

    connection.query(query, values, (error, results) => {
      
      if (error) {
        console.error('Error fetching cart item:', error);
        res.redirect('/'); 
        return;
      }


      const cartitem = results[0];

      if(cartitem){

        const increasequantity = "update user_carts set quantity = quantity +1 where user_id = ? and product_id = ?;"
        
        connection.query(increasequantity, values, (error, results) => {
          if (error) {
            console.error('Couldnt Update Cart Table:', error);
            // res.redirect('/'); 
            return;
          }
        });
    
      }else{
        
        const updateoncart = "insert into user_carts (user_id, product_id, quantity) values(?, ?, 1);";

        connection.query(updateoncart, values, (error, results) => {
          if (error) {
            console.error('Couldnt Add to Cart Table:', error);
            // res.redirect('/'); 
            return;
          }
        });

      }



    });

});



const util = require('util');

// Promisify the query function to use async/await
const queryAsync = util.promisify(connection.query).bind(connection);


router.get('/cart', async (req, res ) => {
  
  
  if (!req.session.user) {
    // User is already logged in
    res.write("You must be logged in to view your cart !");
    return res.end();
  }

  
  const userid = req.session.user.userid;

  const userCartQuery = "SELECT * FROM user_carts WHERE user_id=?";
  const userCartValues = [userid];
  cartProdFinalPrice = [];

  try {
    const userCartResults = await queryAsync(userCartQuery, userCartValues);

    const cartItemsHTML = await processCartItems(userCartResults);

    const cartItemsDetails = await getCartItems(userCartResults);


    console.log(cartItemsDetails);

    // console.log(cartItemsHTML);

    // console.log(userCartResults);

    const cartPageHTML = `
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Bag - Cart</title>
    
        <link rel="stylesheet" href="css/cartstyle.css">
        
    </head>
    <body>
    
        <header>
            <a href="index.html"><img class="logo" src="./images/final-logo.png"></a>
    
            <nav>
                <ul class="nav_links">
    
                    <li> <a href="./mensection">Men</a></li>
                    <li> <a href="./womensection">Women</a></li>
                    <li> <a href="./kids">Kids</a></li>
                    <li> <a href="./acc">Accessories</a></li>
                    <li> <a href="./about">About</a></li>
                    <li> <a href="./cart">Cart</a></li>
                    <li> <a href="./login">Login</a></li>
                    
                </ul>
            </nav>
    
            <a class="cta" href="./logout"> <button>Logout</button></a>
    
        </header>
    
        <hr class="header-seperator">
       
    
        <div class="cart-container">
            <h2 class="cart-heading">${req.session.user.username}'s Bag </h2>
    
    
            <div class="cart-item-container">
    
    
                <div class="cart-item" id="cart-items-heading">
                    <h1>Cart Items :</h1>
                </div>
    
                ${cartItemsHTML}
            </div>
    
            
            <!-- Repeat the cart-item structure for each product -->
    
            <div class="order-details">
                <h1> Cart Details :</h1>
               
                <!--
                ${cartItemsDetails.map(item => `
                <p>${item.product_title}: ₹ ${(parseFloat(item.product_price) * parseFloat(item.quantity)).toFixed(2)}</p>
            `).join('')}

            -->

              ${getCartPrintData(userCartResults, cartItemsDetails, cartProdFinalPrice)}

              <p class="total">Cart Total: ₹${getCartTotal(cartProdFinalPrice)}</p>

                <button class="proceed-button" onclick="proceedToCheckout()">Proceed To Shipping</button>
            </div>
        </div>
    
        <script src="./javascript/deletefromcartPOST.js"></script>
        <script>
        function proceedToCheckout() {
            // Redirect to the '/checkout' route
            window.location.href = '/checkout';
        }
        </script>
    </body>
    </html>
    
    `;

    // You can send the HTML to the client or render a view with this data
    // Save the generated HTML to a file
    const filePath = path.join('C:/Users/Rituparna/OneDrive/Desktop/College 2nd Year/Web Prog/Final Project', 'public', 'cart.html');
    fs.writeFileSync(filePath, cartPageHTML);

    // Respond with the file
    res.sendFile(filePath);



  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


let cartProdFinalPrice = [];
// FUnction to get the cart total on cart page 

function getCartTotal(cartfinalparr){

  let carttotal = 0;

  cartfinalparr.forEach( num => {
    carttotal += num;
  })

    return carttotal;
};


// Function to get data for printing cart details

function getCartPrintData(cartItems, productsInCart, cartfinalparr){

  let cartPrintData = '';

  for (var i = 0; i < productsInCart.length; i++) {
    cartPrintData += `<p>${productsInCart[i].product_title}: ₹${(parseFloat(productsInCart[i].product_price) * parseFloat(cartItems[i].quantity)).toFixed(2)}</p>\n`;
    cartfinalparr.push(parseFloat(productsInCart[i].product_price) * parseFloat(cartItems[i].quantity).toFixed(2));
  }

  console.log(cartfinalparr);
  return cartPrintData;

}



async function processCartItems(userCartResults) {
  let cartitemsHTML = "";

  for (const item of userCartResults) {
    const prodQuery = "SELECT * FROM products WHERE id=?";
    const prodValues = [item.product_id];

    try {
      const prodResults = await queryAsync(prodQuery, prodValues);

      if (prodResults.length > 0) {
        const itemmain = prodResults[0];

        const itemHTML = `
          <div class="cart-item" itemid="${item.product_id}">
            <div class="item-details">
                <img src="${itemmain.product_image}" alt="Product 1" class="product-image">
                <div>
                    <p>${itemmain.product_title}</p>
                    <p>₹${itemmain.product_price}</p>
                    <p>Quantity : ${item.quantity}</p>
                </div>
            </div>
            <button class="delete-button">Delete</button>
          </div>
        `;

        console.log(itemHTML);
        cartitemsHTML += itemHTML;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return cartitemsHTML;
}



// my new function i need to get the cart details

async function getCartItems(userCartResults) {

  cartlist = [];

  for (const item of userCartResults) {
    const prodQuery = "SELECT * FROM products WHERE id=?";
    const prodValues = [item.product_id];

    try {
      const prodResults = await queryAsync(prodQuery, prodValues);
      if (prodResults.length > 0) {

        cartlist.push(prodResults[0]);

      }
    } catch (error) {
      console.error(error);
    }
  }

  return cartlist;

}




// Define a route to handle item removal from the cart
router.post('/removeFromCart', (req, res) => {
  const userId = req.session.user.userid; // Assuming your user information is stored in the session

  // Assuming you are sending the productId to be removed in the request body
  const productId = req.body.productId;

  // Query to update quantity and remove if it's 1
  const updateQuery = `UPDATE user_carts SET quantity = GREATEST(quantity - 1, 0) WHERE user_id = '${userId}' AND product_id = '${productId}'`;
  const deleteQuery = 'DELETE FROM user_carts WHERE user_id = ? AND product_id = ? AND quantity = 0';

  console.log(updateQuery);
  // Execute the update query
  connection.query(updateQuery, (updateError, updateResults) => {
      
    console.log(updateResults)

    if (updateError) {
          console.error('Error updating quantity:', updateError);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
      }

      // Execute the delete query if the quantity is 1 after the update
      connection.query(deleteQuery, [userId, productId], (deleteError, deleteResults) => {
          if (deleteError) {
              console.error('Error deleting product:', deleteError);
              res.status(500).json({ error: 'Internal Server Error' });
              return;
          }

          // Send a success response
          
          res.status(200).json({ message: 'Item removed from cart successfully' });
          // res.redirect('/cart');
      });
  });
});




// Define a route to proceed to final order page to place order
router.get('/checkout', (req, res) => {

  checkoutPageHTML = `
  
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Final Checkout - Clothon</title>
    <link rel="stylesheet" href="./css/style.css">
    <link rel="stylesheet" href="./css/checkoutstyle.css">
    <!-- Include your CSS stylesheets here -->
</head>
<body>

    <header>
        
        <a href="index.html"><img class="logo" src="./images/final-logo.png"></a>

        <nav>
            <ul class="nav_links">

                <li> <a href="./mensection">Men</a></li>
                <li> <a href="./womensection">Women</a></li>
                <li> <a href="./kids">Kids</a></li>
                <li> <a href="./acc">Accessories</a></li>
                <li> <a href="./about">About</a></li>
                <li> <a href="./cart">Cart</a></li>
                <li> <a href="./login">Login</a></li>
                
            </ul>
        </nav>

        <a class="cta" href="./logout"> <button>Logout</button></a>


    </header>


    <hr class="header-seperator"> 




    <div class="checkout-container">
        <!-- Left Section - Order Details -->
        <div class="order-details">
            <h2>Order Details</h2>

            <br><hr><br>
            <p>Cart Total: ₹${getCartTotal(cartProdFinalPrice)}</p>
            <p>Delivery Charge: ₹200.00</p>
            <p>Discount: ₹${getCartTotal(cartProdFinalPrice) * 0.05}</p>

            <hr class="order-total-sep"> 
            
            <p class="total"><b>Order Total: ₹${getCartTotal(cartProdFinalPrice) * 0.95 + 200}</b></p>

            <hr class="order-total-sep">
        </div>

        <!-- Vertical Line Separator -->
        <div class="separator"></div>

        <!-- Right Section - Order Form -->
        <div class="order-form">
            <h2>Order Form</h2> 
            <br><hr><br>    
            <form>
                <label for="fullName">Full Name:</label>
                <input type="text" id="fullName" name="fullName" required>

                <label for="address">Address:</label>
                <textarea id="address" name="address" required></textarea>

                <label for="cardNumber">Card Number:</label>
                <input type="text" id="cardNumber" name="cardNumber" required>

                <label for="cvv">CVV:</label>
                <input type="text" id="cvv" name="cvv" required> 

                <br><br>

                <button type="submit">Place Order</button>
            </form>
        </div>
    </div>

    <!-- <script src="./javascript/checkoutscript.js"></script> -->
</body>
</html>
  
  `;



    // You can send the HTML to the client or render a view with this data
    // Save the generated HTML to a file
    const filePath = path.join('C:/Users/Rituparna/OneDrive/Desktop/College 2nd Year/Web Prog/Final Project', 'public', 'checkout.html');
    fs.writeFileSync(filePath, checkoutPageHTML);

    // Respond with the file
    res.sendFile(filePath);


});





// // Logout route
// router.get('/logout', (req, res) => {
//   req.session.destroy(err => {
//     if (err) {
//       console.error('Error destroying session:', err);
//     }
//     res.redirect('/login'); // Redirect to login after logout
//   });
// });

// Logout route
// Logout route
router.get('/logout', (req, res) => {
  // Check if there is a user in session
  if (!req.session.user) {
    // No user is logged in
    res.write("No user is logged in !");
    return res.end();
  }

  // Clear the user from the session
  req.session.user = null;

  // Redirect to the login page
  return res.redirect('/login');
});





router.get('/success', (req, res) => {
  // Send the success message
  res.write("User Logged In Successfully !");

  // End the response
  res.end();

  // Delay the redirect using client-side JavaScript
  setTimeout(() => {
    res.write('<script>window.location.href = "/";</script>');
    res.end();
  }, 3000);
});





module.exports = router;


