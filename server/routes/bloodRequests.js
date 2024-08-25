const express = require('express');
const { getAllRequests, addBloodRequest,updateBloodRequest,deleteBloodRequest } = require('../controllers/bloodBank');

const router = express.Router();

router.get('/', getAllRequests);
router.post('/', addBloodRequest);
router.put('/:id', updateBloodRequest); // Route for updating a blood request
router.delete('/:id', deleteBloodRequest);

module.exports = router;
