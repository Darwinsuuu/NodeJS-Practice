const express = require('express');
const router = express.Router();

// Get all products
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});


// Save a product
router.post('/', (req, res, next) => {

    const product = {
        name: req.body.name,
        price: req.body.price
    }

    res.status(201).json({
        message: 'Handling POST requests to /products',
        createdProduct: product
    });
});


// Get specific product
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (!isNaN(id)) {
        res.status(200).json({
            message: 'ID is a number',
        });
    } else {
        res.status(200).json({
            message: 'ID is not a number',
        });
    }
});


// Update a product
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: 'Product updated',
    });
});


// Delete a product
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: 'Product deleted',
    });
});


module.exports = router;