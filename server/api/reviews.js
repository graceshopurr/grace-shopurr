const router = require('express').Router();
const { Review } = require('../db/models');
module.exports = router;

// GET /review - shows all reviews
// GET /reviews/:id - shows a particular review
// POST /reviews/ - creates an review
// /PUT reviews/:id/ - updates an review
// /DELETE reviews/:id/- deletes an review

// GET /api/reviews
router.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next);
});
// GET /api/reviews/:reviewId
router.get('/:reviewId', (req, res, next) => {
  const id = req.params.reviewId;
  Review.findById(id)
    .then(review => res.json(review))
    .catch(next);
});


// POST /api/reviews/
router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then( (review) => res.status(201).json(review))
    .catch(next);
});

// PUT /api/reviews/:reviewId
router.put('/:reviewId', (req, res, next) => {
  const id = req.params.reviewId;
  Review.findById(id)
    .then(review => review.update(req.body))
    .then(updated => {
        let updatedResponse = updated.dataValues;
        res.send({message: 'Updated sucessfully', updatedResponse})
    })
    .catch(next);
});

// DELETE /api/reviews/:reviewId
router.delete('/:reviewId', (req, res, next) => {
  const id = req.params.reviewId;
  Review.findById(id)
    .then(foundReview => { return foundReview.destroy() })
    .then(result => {
      res.send({ message: 'Deleted successfully' })
    })
    .catch(next);
});
