const express = require('express');
const mysql2 = require('mysql2');
const router = express.Router();
const fs = require('fs');
const path = require('path');


const connection = mysql2.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'noyarc',
    database: 'clothondb'

})


connection.connect(err => {

    if(err){
        console.error('Error Connecting to the MySql : ', err)
    }else{
        console.log('Connected to MySql !')
    }

})



function getProductQuery(prodid){

    if(prodid.includes("MP")){
        return `SELECT * from mensproducts where id='${prodid}'`;
    }else if(prodid.includes("WP")){
        return `SELECT * from womensproducts where id='${prodid}'`;
    } else if (prodid.includes("KP")){
        return `SELECT * from kidsproducts where id='${prodid}'`;
    } else if (prodid.includes("AP")) {
        return `SELECT * from accessories where id='${prodid}'`;
    }

}



router.get('/productId=:productId',(req,res) => {

    const productId = req.params.productId;


    const query = getProductQuery(productId);
    console.log(query);

    // const query = `SELECT * from mensproducts where id='${productId}'`;



    connection.query(query, (err, results) => {

        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).send('Error fetching products.');
        
        }else {

            // Fetch data having productid equal to the productid in query

            // var rating = '';

            // for(var i=1; i <= results[0].product_rating; i++){
            //     rating += '★';
            // }


            const prodDataHTML = results.map(product =>`
            <div class="product-container">
                <div id="product-info">
                <img id="product-image" src="${product.product_image}" alt="Product Image">
                <div id="product-details">
                    <h1 id="product-name"> ${product.product_title}</h1>
                    <p id="product-brand">Brand: ${product.product_brand}</p>
                    <p id="product-price">Price: ₹${product.product_price}</p>
                    <p id="product-rating">Rating: ${product.product_rating}</p>
                    <br>
                    <div id="product-description">
                    <h2>Description:</h2>
                    <ul>
                        <li>${product.pd1}</li>
                        <li>${product.pd2}</li>
                        <li>${product.pd3}</li>
                        <li>${product.pd4}</li>
                    </ul>
                    </div>
                    <button id="buyNowButton"> Buy Now </button>
                    <button id="addtocartButton"> Add to Cart </button>
                </div>

                </div>
            </div>
            `);


            const prodPageHTML = `
            
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Product Information</title>
            <link rel="stylesheet" href="./css/productpage.css">
            <link rel="stylesheet" href="./css/style.css">
            </head>
            <body>

            <header>
                <a href="index.html"><img class="logo" src="./images/final-logo.png"></a>
                <nav>
                <ul class="nav_links">
                    <li><a href="./mensection">Men</a></li>
                    <li><a href="#">Women</a></li>
                    <li><a href="#">Kids</a></li>
                    <li><a href="#">Accessories</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Cart</a></li>
                </ul>
                </nav>
                <a class="cta" href="#"><button>Contact</button></a>
            </header>

            <hr class="header-separator">

                ${prodDataHTML}

            <script src="product.js"></script>
            </body>
            </html>

            
            `;


            // Save the generated HTML to a file
            const filePath = path.join('C:/Users/Rituparna/OneDrive/Desktop/College 2nd Year/Web Prog/Final Project', 'public', 'product.html');
            fs.writeFileSync(filePath, prodPageHTML);

            // Respond with the file
            res.sendFile(filePath);

            // res.send(prodPageHTML);

        }


    });

});


// Close MySQL connection when the router is unloaded
// router.use((req, res, next) => {
//     connection.end();
//     next();
// });


module.exports = router;