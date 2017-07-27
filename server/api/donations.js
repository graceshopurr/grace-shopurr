const router = require('express').Router()
const { DonationProduct } = require('../db/models')
module.exports = router;

// GET /donations - shows all donation products
// GET /donations/:id - shows a particular donation product
// POST /donations - creates a donation product
// PUT /donations/:id - updates a donation product
// DELETE /donations/:id - deletes a donation product
// /donations/:id/addReview for a donation product
// ^^ EI: POST to /reviews instead?

// GET /api/donations
router.get('/', (req, res, next) => {
  DonationProduct.findAll()
    .then(donations => res.json(donations))
    .catch(next);
})
// GET /api/donations/:donationId
router.get('/:donationId', (req, res, next) => {
  const id = req.params.donationId;
  DonationProduct.findById(id)
    .then(donation => res.json(donation))
    .catch(next);
})

// POST /api/donations/
router.post('/', (req, res, next) => {
  DonationProduct.create(req.body)
    .then((donation) => res.json(donation))
    .catch(next);
})

// PUT /api/donations/:donationId
router.put('/:donationId', (req, res, next) => {
  const id = req.params.donationId;
  DonationProduct.findById(id)
    .then(donation => donation.update(req.body))
    .catch(next);
})

// DELETE /api/donations/:donationId
router.delete('/:donationId', (req, res, next) => {
  const id = req.params.donationId;
  DonationProduct.findById(id)
    .then(foundDonation => { return foundDonation.destroy() })
    .catch(next);
});
