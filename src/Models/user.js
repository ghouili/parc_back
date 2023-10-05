const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    cin: { type: Number, required: true, unique: true, },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    tel: { type: Number, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: 'avatar.png' },
    competence: { type: String, required: true },
    niveau: { type: String, required: true },
    date_embouche: { type: String, required: true },
    role: { type: String, required: true },
    // mission:{ type: mongoose.Types.ObjectId, ref: "mission", default: null },
});

UserSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
});

module.exports = mongoose.model('user', UserSchema);