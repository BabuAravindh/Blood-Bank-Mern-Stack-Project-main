const Donor = require('../models/Donor');

exports.getAllDonors = async (req, res) => {
    try {
        const donors = await Donor.find();
        res.json(donors);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.addDonor = async (req, res) => {
    try {
        const newDonor = new Donor(req.body);
        await newDonor.save();
        res.json(newDonor);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
