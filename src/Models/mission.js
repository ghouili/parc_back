const mongoose = require('mongoose');

const missionSchema = mongoose.Schema({
    title: { type: String, required: true },
    date_affectation: { type: String, default: null },
    date_done: { type: String, default: null },
    duration: { type: String, required: true },
    destination: { type: String, required: true },
    chauffeur:{ type: mongoose.Types.ObjectId, ref: "user" },
    // marchandise:{ type: mongoose.Types.ObjectId, ref: "marchandise" },
});


module.exports = mongoose.model('mission', missionSchema);