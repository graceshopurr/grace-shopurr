const router = require('express').Router()
const {Cat} = require('../db/models')
module.exports = router;

// /cats - shows all cats!
// /cats/:id - shows a particular cat
// POST /cats - creates a cat!
// PUT /cats/:id - updates a cat
// DELETE /cats/:id - deletes a cat
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

// POST /api/cats
router.post('/', (req, res, next) => {
    Cat.create(req.body)
    .then( (cat) => res.status(201).json(cat))
    .catch(next);
})

// PUT /api/cats/:catId
router.put('/:catId', (req, res, next) => {
    const id = req.params.catId;
    Cat.findById(id)
    .then(cat => cat.update(req.body))
    .then(updated => {
        let updatedResponse = updated.dataValues;
        res.send({message: 'Updated sucessfully', updatedResponse})
    })
    .catch(next);
})

// DELETE /api/cats/:catId
router.delete('/:catId', (req, res, next) => {
    const id = req.params.catId;
    Cat.findById(id)
    .then(foundCat => {
     foundCat.destroy()} )
    .then(result => {
    res.send({ message: 'Deleted successfully' })
  })
    .catch(next);
});
