const router = require('express').Router()
const { Product } = require('../db/models')
module.exports = router;

// /products - shows all products
// /products/:id - shows a particular product
// /products/new - creates a product
// /products/:id/update - updates a product
// /products/:id/delete - deletes a product
// /products/:id/addReview for a product

// GET /api/products
router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch(next);
})
// GET /api/products/:productId
router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .then(product => res.json(product))
    .catch(next);
})

// POST /api/products/
router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then((product) => res.json(product))
    .catch(next);
})

// PUT /api/products/:productId
router.put('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .then(product => product.update(req.body))
    .catch(next);
})

// DELETE /api/products/:productId
router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .then(foundProduct => { return foundProduct.destroy() })
    .catch(next);
});
