const BloodRequest = require('../models/BloodRequest');

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
