const router = require('express').Router()
const { Order } = require('../db/models')
module.exports = router;

// GET /orders - shows all orders
// GET /orders/:id - shows a particular order
// POST /orders/ - creates an order
// /PUT orders/:id/ - updates an order
// /DELETE orders/:id/- deletes an order

// GET /api/orders
router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.json(orders))
    .catch(next);
})
// GET /api/orders/:orderId
router.get('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
    .then(order => res.json(order))
    .catch(next);
})

// router.get(':/date', (req, res, next) => {
//   const date = req.params.date;
// })

// POST /api/orders/
router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then((order) => res.json(order))
    .catch(next);
})

// PUT /api/orders/:orderId
router.put('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
    .then(order => order.update(req.body))
    .catch(next);
})

// DELETE /api/orders/:orderId
router.delete('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
    .then(foundOrder => { return foundOrder.destroy() })
    .catch(next);
});
