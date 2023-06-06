const express = require('express');  // importing express
const morgan = require('morgan');  // importing morgan
const bodyParser = require('body-parser'); // importing body-parser
var mysql = require('mysql');  // importing mysql

const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev')); // used for logging APIs
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


// Prevent CORS Errors and prevent other webpages accessing the API
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});


// API Calls
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


// Handles all 404 issues
app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
});


// Handles all 500 issues
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});


module.exports = app;