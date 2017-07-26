const router = require('express').Router()
const { DonationProduct } = require('../db/models')
module.exports = router;

// /donations - shows all donation products
// /donations/:id - shows a particular donation product
// /donations/new - creates a donation product
// /donations/:id/update - updates a donation product
// /donations/:id/delete - deletes a donation product
// /donations/:id/addReview for a donation product

// GET /api/donations
router.get('/', (req, res, next) => {
  Donation.findAll()
    .then(donations => res.json(donations))
    .catch(next);
})
// GET /api/donations/:donationId
router.get('/:donationId', (req, res, next) => {
  const id = req.params.donationId;
  Donation.findById(id)
    .then(donation => res.json(donation))
    .catch(next);
})

// POST /api/donations/newDonation
router.post('/newDonation', (req, res, next) => {
  Donation.create(req.body)
    .then((donation) => res.json(donation))
    .catch(next);
})

// PUT /api/donations/newDonation
router.put('/:donationId/update', (req, res, next) => {
  const id = req.params.donationId;
  Donation.findById(id)
    .then(donation => donation.update(req.body))
    .catch(next);
})

// DELETE /api/donations/newDonation
router.delete('/:donationId/delete', (req, res, next) => {
  const id = req.params.donationId;
  Donation.findById(id)
    .then(foundDonation => { return foundDonation.destroy() })
    .catch(next);
});
