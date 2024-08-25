const express = require('express');

const { updateDonor, deleteDonor ,getAllDonors,addDonor} = require('../controllers/bloodBank');

const router = express.Router();

router.get('/', getAllDonors);
router.post('/', addDonor);
router.put('/:id', updateDonor);  // Route for updating a donor
router.delete('/:id', deleteDonor);
module.exports = router;
