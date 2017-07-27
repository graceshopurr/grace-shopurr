const router = require('express').Router()
const {User} = require('../db/models')
const {Order} = require('../db/models')
module.exports = router

// GET /users - shows all users
// GET /users/:id - shows a particular user
// PUT /users/:id - updates a user
// DELETE /users/:id - deletes a user
// GET users/:id/orders - shows all orders for a particular user

// GET /users
router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

// GET /api/users/:userId
router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findOne({
        where: {id},
        attributes: ['id', 'email']
      })
    .then(user => res.json(user))
    .catch(next);
})

// GET users/:id/orders
router.get('/:userId/orders', (req, res, next) => {
    const userId = req.params.userId;
    Order.findAll({
        where: {userId},
      })
    .then(orders => res.json(orders))
    .catch(next);
})

// PUT /api/users/:userId
router.put('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findOne({
        where: {id},
        attributes: ['id', 'email']
      })
    .then(user => user.update(req.body) )
    .catch(next);
})

// DELETE /api/users/:userId
router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findOne({
        where: {id},
        attributes: ['id', 'email']
      })
    .then(foundUser => {return foundUser.destroy()} )
    .catch(next);
});
