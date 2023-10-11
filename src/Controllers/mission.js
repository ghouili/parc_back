const mission = require('../Models/mission');

const moment = require('moment');

const GetAllMarchandise = async (req, res) => {

    let existmissions
    try {
        existmissions = await mission.find({ marchandise: null}).populate('chauffeur');
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existmissions });

}

const GetAll = async (req, res) => {

    let existmissions
    try {
        existmissions = await mission.find().populate('chauffeur');
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existmissions });

}

const Add = async (req, res) => {

    const {
        title,
        duration,
        destination,
        chauffeur,
        // marchandise
    } = req.body;

    const Newmission = new mission({
        title,
        date_affectation: moment().format('L'),
        duration,
        destination,
        chauffeur,
    });

    try {
        await Newmission.save();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(201).json({ success: true, message: 'success', data: Newmission });
}

const FindById = async (req, res) => {

    const { id } = req.params;

    let existmission
    try {
        existmission = await mission.findById(id).populate('chauffeur');
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existmission) {
        return res.status(200).json({ success: false, messgae: 'mission doesnt exist!!', error: false });
    }

    return res.status(200).json({ success: true, message: 'success', data: existmission });

}

const Update = async (req, res) => {

    const {
        title,
        duration,
        destination,
        chauffeur,
    } = req.body;

    const { id } = req.params;

    console.log(req.body);

    let existmission
    try {
        existmission = await mission.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existmission) {
        return res.status(200).json({ success: false, messgae: 'mission doesnt exist!!', error: false });
    }


    if (title) { existmission.title = title; }
    if (duration) { existmission.date_affectation = duration; }
    if (destination) { existmission.date_affectation = destination; }
    if (chauffeur) { existmission.chauffeur = chauffeur; }

    try {
        await existmission.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error.errors })
    }

    return res.status(200).json({ success: true, message: 'success', data: existmission });
}

const Delete = async (req, res) => {

    const { id } = req.params;

    let existmission
    try {
        existmission = await mission.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existmission) {
        return res.status(200).json({ success: false, messge: 'mission doesnt exist!!', error: false });
    }

    try {
        await existmission.deleteOne();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }
    return res.status(200).json({ success: true, message: 'mission Deleted Successfully' });

}

exports.Add = Add
exports.GetAll = GetAll
exports.GetAllMarchandise = GetAllMarchandise
exports.FindById = FindById
exports.Update = Update
exports.Delete = Delete