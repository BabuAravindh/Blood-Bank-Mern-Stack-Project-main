const Donor = require('../models/Donor');
const BloodRequest = require('../models/BloodRequest')



// Get all donors
exports.getAllDonors = async (req, res) => {
    try {
        const donors = await Donor.find();
        res.json(donors);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Add a new donor
exports.addDonor = async (req, res) => {
    try {
        const newDonor = new Donor(req.body);
        await newDonor.save();
        res.json(newDonor);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update an existing donor
exports.updateDonor = async (req, res) => {
    try {
        const updatedDonor = await Donor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDonor) {
            return res.status(404).json({ error: 'Donor not found' });
        }
        res.json(updatedDonor);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a donor
exports.deleteDonor = async (req, res) => {
    try {
        const deletedDonor = await Donor.findByIdAndDelete(req.params.id);
        if (!deletedDonor) {
            return res.status(404).json({ error: 'Donor not found' });
        }
        res.json({ message: 'Donor deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAllRequests = async (req, res) => {
    try {
        const requests = await BloodRequest.find();
        res.json(requests);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.addBloodRequest = async (req, res) => {
    try {
        const newRequest = new BloodRequest(req.body);
        await newRequest.save();
        res.json(newRequest);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateBloodRequest = async (req, res) => {
    try {
        const updatedRequest = await BloodRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRequest) {
            return res.status(404).json({ error: 'Blood request not found' });
        }
        res.json(updatedRequest);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteBloodRequest = async (req, res) => {
    try {
        const deletedRequest = await BloodRequest.findByIdAndDelete(req.params.id);
        if (!deletedRequest) {
            return res.status(404).json({ error: 'Blood request not found' });
        }
        res.json({ message: 'Blood request deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};