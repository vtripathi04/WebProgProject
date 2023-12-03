const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const connection = require('../../db'); // Import the database connection



function getStarArr(results){
   
    var stararr = [];
    var stars = '';

    for(var i=0; i<results.length; i++){
        
        for(var j=0; j<results[i].product_rating; j++){
            stars += '★'; 
        }

        for(var j=0; j< 5 - results[i].product_rating; j++){
            stars += '☆'; 
        }

        stararr.push(stars);
        stars = '';
    }

    return stararr;
}


// Define a route to fetch mens product data
router.get('/mensection', (req, res) => {
    const query = 'SELECT * FROM mensproducts';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).send('Error fetching products.');
        } else {
            
            // make star ratings for each product

            var starray = getStarArr(results);
            var starind = 0;

           // Process the fetched data and generate HTML

                // console.log(results[0]);
                // console.log(starray);

                const productHTML = results.map(product => `
                <div class="product" id="${product.id}">
                <img src="${product.product_image}" alt="${product.product_title}" class="mpimg" data-product-id="${product.id}">
                <div class="product-details">
                    <p class="brand-name">${product.product_brand}</p>
                    <h3 class="product-name">${product.product_title}</h3>
                    <p class="price">${product.product_price}</p>
                    <div class="star-rating">${starray[starind++]}</div>
                </div>
                </div>

            `).join('');


            // Complete HTML with fetched product data
            const html = `
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="./css/style.css">
                <link rel="stylesheet" href="./css/mensclothes.css">
                <script src="./javascript/elproductpage.js"></script>
                <title>Mens Catalogue</title>
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
            
                    <a class="cta" href="./logout"> 
                    <button>Logout</button></a>
                </header>
            
                <hr class="header-seperator">
            
                <div class="catalog-page">
                    <h2 class="page-heading">Men's Section</h2>
                    <p class="page-subheading"> Premium Clothing Collection for Men. </p> 
                    <br>
            
                    <div class="product-container">
            
                        ${productHTML}
            
                    </div>
                </div>
            
                <footer>
                    <!-- Footer content (as in the previous example) -->
                </footer>
            
                <hr class="footer-sep">
            
                <div class="copyright">
                    <!-- Copyright content (as in the previous example) -->
                </div>
            
            </body>
            
            </html>
            
            `;
            

            // Save the generated HTML to a file
            const filePath = path.join('C:/Users/Rituparna/OneDrive/Desktop/College 2nd Year/Web Prog/Final Project', 'public', 'mensection.html');
            fs.writeFileSync(filePath, html);

            // Respond with the file
            res.sendFile(filePath);
            
        }
    });
});




// Define a route to fetch womens product data
router.get('/womensection', (req, res) => {

    const query = 'SELECT * FROM womensproducts';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).send('Error fetching products.');
        } else {

            // get star ratings for every product

            var starray = getStarArr(results);
            var starind = 0;


           // Process the fetched data and generate HTML
                const productHTML = results.map(product => `
                <div class="product" id="${product.id}">
                <img src="${product.product_image}" alt="${product.product_title}" class="mpimg" data-product-id="${product.id}">
                <div class="product-details">
                    <p class="brand-name">${product.product_brand}</p>
                    <h3 class="product-name">${product.product_title}</h3>
                    <p class="price">${product.product_price}</p>
                    <div class="star-rating">${starray[starind++]}</div>
                </div>
                </div>

            `).join('');

            // Complete HTML with fetched product data
            const html = `
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="./css/style.css">
                <link rel="stylesheet" href="./css/mensclothes.css">
                <script src="./javascript/elproductpage.js"></script>
                <title>Mens Catalogue</title>
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
            
                    <a class="cta" href="./logout"> 
                    <button>Logout</button></a>
                </header>
            
                <hr class="header-seperator">
            
                <div class="catalog-page">
                    <h2 class="page-heading">Women's Section</h2>
                    <p class="page-subheading"> Premium Clothing Collection for Women. </p> 
                    <br>
            
                    <div class="product-container">
            
                        ${productHTML}
            
                    </div>
                </div>
            
                <footer>
                    <!-- Footer content (as in the previous example) -->
                </footer>
            
                <hr class="footer-sep">
            
                <div class="copyright">
                    <!-- Copyright content (as in the previous example) -->
                </div>
            
            </body>
            
            </html>
            
            `;
            

            // Save the generated HTML to a file
            const filePath = path.join('C:/Users/Rituparna/OneDrive/Desktop/College 2nd Year/Web Prog/Final Project', 'public', 'womensection.html');
            fs.writeFileSync(filePath, html);

            // Respond with the file
            res.sendFile(filePath);
            
        }
    });
});






// Router for the kids section


router.get('/kids', (req, res) => {

    const query = 'SELECT * FROM kidsproducts';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).send('Error fetching products.');
        } else {

            // get star ratings for every product

            var starray = getStarArr(results);
            var starind = 0;


            prodHTML = results.map(product => `

            <div class="product" id="${product.id}">
            <img src="${product.product_image}" alt="Pink foil print kurta" class="mpimg" data-product-id="${product.id}">
            <div class="product-details">
                <p class="brand-name">${product.product_brand}</p>
                <h3 class="product-name">${product.product_title}</h3>
                <p class="price">${product.product_price}</p>
                <div class="star-rating">${starray[starind++]}</div>
            </div>
            </div>
        
            `).join('');

            html = `

                
            <!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="./css/style.css">
                <link rel="stylesheet" href="./css/mensclothes.css">
                <script src="./javascript/elproductpage.js"></script>
                <title>Kids Catalogue</title>
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

                    <a class="cta" href="./logout"> 
                    <button>Logout</button></a>
                </header>

                <hr class="header-seperator">

                <div class="catalog-page">
                    <h2 class="page-heading">Kid's Section</h2>
                    <p class="page-subheading"> Premium Clothing Collection for Kids. </p> 
                    <br>

                    <div class="product-container">

                            ${prodHTML}

                    </div>
                </div>

                <footer>
                    <!-- Footer content (as in the previous example) -->
                </footer>

                <hr class="footer-sep">

                <div class="copyright">
                    <!-- Copyright content (as in the previous example) -->
                </div>

            </body>

            </html>
            `;

            // res.send(html);

            // Save the generated HTML to a file
            const filePath = path.join('C:/Users/Rituparna/OneDrive/Desktop/College 2nd Year/Web Prog/Final Project', 'public', 'kidsection.html');
            fs.writeFileSync(filePath, html);

            // Respond with the file
            res.sendFile(filePath);

            

        }
        
    });

});




// Router for the accessories section


router.get('/acc', (req, res) => {

    const query = 'SELECT * FROM accessories';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).send('Error fetching products.');
        } else {

            // get star ratings for every product

            var starray = getStarArr(results);
            var starind = 0;


            prodHTML = results.map(product => `

            <div class="product" id="${product.id}">
            <img src="${product.product_image}" alt="Pink foil print kurta" class="mpimg" data-product-id="${product.id}">
            <div class="product-details">
                <p class="brand-name">${product.product_brand}</p>
                <h3 class="product-name">${product.product_title}</h3>
                <p class="price">${product.product_price}</p>
                <div class="star-rating">${starray[starind++]}</div>
            </div>
            </div>
        
            `).join('');

            html = `

                
            <!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="./css/style.css">
                <link rel="stylesheet" href="./css/mensclothes.css">
                <script src="./javascript/elproductpage.js"></script>
                <title>Accessories Catalogue</title>
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

                    <a class="cta" href="./logout"> 
                    <button>Logout</button></a>
                </header>

                <hr class="header-seperator">

                <div class="catalog-page">
                    <h2 class="page-heading">Accessories Section</h2>
                    <p class="page-subheading"> Premium Accessory Collection for All. </p> 
                    <br>

                    <div class="product-container">

                            ${prodHTML}

                    </div>
                </div>

                <footer>
                    <!-- Footer content (as in the previous example) -->
                </footer>

                <hr class="footer-sep">

                <div class="copyright">
                    <!-- Copyright content (as in the previous example) -->
                </div>

            </body>

            </html>
            `;

            // res.send(html);

            // Save the generated HTML to a file
            const filePath = path.join('C:/Users/Rituparna/OneDrive/Desktop/College 2nd Year/Web Prog/Final Project', 'public', 'accsection.html');
            fs.writeFileSync(filePath, html);

            // Respond with the file
            res.sendFile(filePath);

            

        }
        
    });

});











// Close MySQL connection when the router is unloaded
router.use((req, res, next) => {
    connection.end();
    next();
});


module.exports = router;
