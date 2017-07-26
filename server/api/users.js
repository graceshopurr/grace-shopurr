const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// /users - shows all users
// /users/:id - shows a particular user
// /users/:id/update - updates a user
// /users/:id/delete - deletes a user
// /users/:id/addReview ? cats can review users?

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

// PUT /api/users/:userId/update
router.put('/:userId/update', (req, res, next) => {
    const id = req.params.userId;
    User.findOne({
        where: {id},
        attributes: ['id', 'email']
      })
    .then(user => user.update(req.body) )
    .catch(next);
})

// DELETE /api/users/:userId/delete
router.delete('/:userId/delete', (req, res, next) => {
    const id = req.params.userId;
    User.findOne({
        where: {id},
        attributes: ['id', 'email']
      })
    .then(foundUser => {return foundUser.destroy()} )
    .catch(next);
});
