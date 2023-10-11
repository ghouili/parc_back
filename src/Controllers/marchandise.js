const marchandise = require('../Models/marchandise');

const GetAllMission = async (req, res) => {

    let existmarchandises
    try {
        existmarchandises = await marchandise.find({ mission: null });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existmarchandises });

}

const GetAll = async (req, res) => {

    let existmarchandises
    try {
        existmarchandises = await marchandise.find().populate('mission');
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existmarchandises });

}

const Add = async (req, res) => {

    const {
        title,
        type,
        qte,

    } = req.body;

    let mission = null;
    if (req.body.mission) { mission = req.body.mission }
    const Newmarchandise = new marchandise({
        title,
        type,
        qte,
        mission
    });

    try {
        await Newmarchandise.save();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(201).json({ success: true, message: 'success', data: Newmarchandise });
}

const FindById = async (req, res) => {

    const { id } = req.params;

    let existmarchandise
    try {
        existmarchandise = await marchandise.findById(id).populate('mission');
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existmarchandise) {
        return res.status(200).json({ success: false, messgae: 'marchandise doesnt exist!!', error: false });
    }

    return res.status(200).json({ success: true, message: 'success', data: existmarchandise });

}

const Update = async (req, res) => {

    const {
        title,
        type,
        qte,
        mission

    } = req.body;

    const { id } = req.params;

    console.log(req.body);

    let existmarchandise
    try {
        existmarchandise = await marchandise.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existmarchandise) {
        return res.status(200).json({ success: false, messgae: 'marchandise doesnt exist!!', error: false });
    }


    if (title) { existmarchandise.title = title; }
    if (type) { existmarchandise.type = type; }
    if (qte) { existmarchandise.qte = qte; }
    if (mission) { existmarchandise.mission = mission; }





    try {
        await existmarchandise.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error.errors })
    }

    return res.status(200).json({ success: true, message: 'success', data: existmarchandise });
}

const Delete = async (req, res) => {

    const { id } = req.params;

    let existmarchandise
    try {
        existmarchandise = await marchandise.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existmarchandise) {
        return res.status(200).json({ success: false, messge: 'marchandise doesnt exist!!', error: false });
    }

    try {
        await existmarchandise.deleteOne();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }
    return res.status(200).json({ success: true, message: 'marchandise Deleted Successfully' });

}

exports.Add = Add
exports.GetAllMission = GetAllMission
exports.GetAll = GetAll
exports.FindById = FindById
exports.Update = Update
exports.Delete = Delete