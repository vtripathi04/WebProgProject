const express = require('express');
const path = require('path');
const fetchProducts = require('./routes/apis/fetchProducts.js');
const bodyParser = require('body-parser');
const addProduct = require('./routes/apis/addProduct.js');
const getProduct = require('./routes/apis/getProduct.js');
const cors = require('cors'); // Import cors module


const app = express();

// set static folder
app.use(cors()); // Enable CORS
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', fetchProducts);
app.use('/', getProduct)
// Parse JSON requests
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));

});




// app.get('/mensection', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'mensection.html'));
// });



app.get('/mensection', fetchProducts);   
app.get('/womensection', fetchProducts);
app.get('/kids', fetchProducts);



// app.use('/api', addProduct);
  


const PORT  = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));