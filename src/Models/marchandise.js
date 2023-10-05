const mongoose = require('mongoose');

const marchandiseSchema = mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    qte: { type: Number, required: true },
    mission:{ type: mongoose.Types.ObjectId, default: null, ref: "mission" },
});


module.exports = mongoose.model('marchandise', marchandiseSchema);