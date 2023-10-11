const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    number: { type: String, required: true, unique: true, },
    brand: { type: String, required: true },
    type: { type: String, required: true },
    fuelType: { type: String, required: true },
    picture: { type: String, default: 'car.png' },
    ispanne: { type: Boolean, default: false },
    panne: { type: String, default: 'Rien' },
    chauffeur: { type: mongoose.Types.ObjectId, ref: "user", default: null },
    panne:{ type: mongoose.Types.ObjectId, ref: "maintenance", default: null },
});


module.exports = mongoose.model('car', carSchema);