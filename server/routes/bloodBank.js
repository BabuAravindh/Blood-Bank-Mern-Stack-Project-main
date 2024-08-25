const express = require('express');
const {
    getAllDonors,
    addDonor,
    updateDonor,
    deleteDonor,
    getAllRequests,
    addBloodRequest,
    updateBloodRequest,
    deleteBloodRequest
} = require('../controllers/bloodBank');

const router = express.Router();


router.get('/', getAllDonors);
router.post('/', addDonor);
router.put('/:id', updateDonor);  // Route for updating a donor
router.delete('/:id', deleteDonor);  // Route for deleting a donor

router.get('/', getAllRequests);
router.post('/', addBloodRequest);
router.put('/:id', updateBloodRequest); // Route for updating a blood request
router.delete('/:id', deleteBloodRequest); // Route for deleting a blood request
module.exports = router;
