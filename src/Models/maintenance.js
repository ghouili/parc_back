const mongoose = require('mongoose');

const maintenanceSchema = mongoose.Schema({
    panne: { type: Number, required: true },
    date_declaration: { type: Number, required: true },
    date_done: { type: Number, required: true },
    carid:{ type: mongoose.Types.ObjectId, required: true, ref: "car" },
});


module.exports = mongoose.model('maintenance', maintenanceSchema);