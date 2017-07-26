const router = require('express').Router()
const {Cat} = require('../db/models')
module.exports = router;

// /cats - shows all cats!
// /cats/:id - shows a particular cat
// /cats/new - creates a cat!
// /cats/:id/update - updates a cat
// /cats/:id/delete - deletes a cat
// /cats/:id/addReview ?

// GET /api/cats
router.get('/', (req, res, next) => {
    Cat.findAll()
    .then(cats => res.json(cats))
    .catch(next);
})
// GET /api/cats/:catId
router.get('/:catId', (req, res, next) => {
    const id = req.params.catId;
    Cat.findById(id)
    .then(cat => res.json(cat))
    .catch(next);
})

// POST /api/cats/newCat
router.post('/newCat', (req, res, next) => {
    Cat.create(req.body)
    .then( (cat) => res.json(cat))
    .catch(next);
})

// PUT /api/cats/:catId/update
router.put('/:catId/update', (req, res, next) => {
    const id = req.params.catId;
    Cat.findById(id)
    .then(cat => cat.update(req.body) )
    .catch(next);
})

// DELETE /api/cats/:catId/delete
router.delete('/:catId/delete', (req, res, next) => {
    const id = req.params.catId;
    Cat.findById(id)
    .then(foundCat => {return foundCat.destroy()} )
    .catch(next);
});