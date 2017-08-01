const router = require('express').Router()
const { Product } = require('../db/models')
module.exports = router;

// GET /products - shows all products
// GET /products/:id - shows a particular product
// POST /products/new - creates a product
// PUT /products/:id/update - updates a product
// DELETE /products/:id/delete - deletes a product
// POST /products/:id/addReview for a product - not implemented

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
    .then((product) => res.status(201).json(product))
    .catch(next);
})

// PUT /api/products/:productId
router.put('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
  .then(product => product.update(req.body))
  // .then(product => res.json(product))
  .then(updated => {
    let updateResponse = updated.dataValues;
    res.send({ message: 'Updated successfully', updateResponse})
  })
  .catch(next);
})

// DELETE /api/products/:productId
router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
  .then(foundProduct => {
    foundProduct.destroy()
  })
  .then(result => {
    res.send({ message: 'Deleted successfully' })
  })
  .catch(next);
});
