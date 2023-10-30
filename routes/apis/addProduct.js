// productRouter.js

const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'noyarc',
  database: 'clothondb',
});

connection.connect();

// Define a route to insert a new product
router.post('/products', (req, res) => {
  // Assuming you have product data in the request body
  const { image, brand, title, price, rating } = req.body;

  // Insert product data into the database
  const query = 'INSERT INTO mensproducts (id, product_image, product_brand, product_title, product_price, product_rating) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [id, image, brand, title, price, rating];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.error('Error inserting product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.status(201).json({ message: 'Product inserted successfully' });
  });
});

connection.end();

module.exports = router;
