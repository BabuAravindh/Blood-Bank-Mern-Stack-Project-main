const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema({
    requesterName: { type: String, required: true },
    bloodType: { type: String, required: true },
    quantity: { type: Number, required: true },
    hospital: { type: String, required: true },
    contact: { type: String, required: true },
    status: { type: String, default: 'Pending' },
});

const BloodRequest = mongoose.model('BloodRequest', bloodRequestSchema);

module.exports = BloodRequest;
