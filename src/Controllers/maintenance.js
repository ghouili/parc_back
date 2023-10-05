const maintenance = require('../Models/maintenance');

const GetAll = async (req, res) => {

    let existmaintenances
    try {
        existmaintenances = await maintenance.find();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existmaintenances });

}

const Add = async (req, res) => {

    const {
        panne,
        date_declaration,
        date_done,
        carid,
    } = req.body;

    const Newmaintenance = new maintenance({
        panne,
        date_declaration,
        date_done,
        carid,
    });

    try {
        await Newmaintenance.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(201).json({ success: true, message: 'success', data: Newmaintenance });
}

const FindById = async (req, res) => {

    const { id } = req.params;

    let existmaintenance
    try {
        existmaintenance = await maintenance.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existmaintenance) {
        return res.status(200).json({ success: false, messgae: 'maintenance doesnt exist!!', error: false });
    }

    return res.status(200).json({ success: true, message: 'success', data: existmaintenance });

}

const Update = async (req, res) => {

    const {
        panne,
        date_declaration,
        date_done,
        carid,
    } = req.body;

    const { id } = req.params;

    // console.log(req.body);

    let existmaintenance
    try {
        existmaintenance = await maintenance.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existmaintenance) {
        return res.status(200).json({ success: false, messgae: 'maintenance doesnt exist!!', error: false });
    }


    if (panne) { existmaintenance.panne = panne; }
    if (date_declaration) { existmaintenance.date_declaration = date_declaration; }
    if (date_done) { existmaintenance.date_done = date_done; }
    if (carid) { existmaintenance.carid = carid; }





    try {
        await existmaintenance.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error.errors })
    }

    return res.status(200).json({ success: true, message: 'success', data: existmaintenance });
}

const Delete = async (req, res) => {

    const { id } = req.params;

    let existmaintenance
    try {
        existmaintenance = await maintenance.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existmaintenance) {
        return res.status(200).json({ success: false, messge: 'maintenance doesnt exist!!', error: false });
    }

    try {
        await existmaintenance.deleteOne();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }
    return res.status(200).json({ success: true, message: 'maintenance Deleted Successfully' });

}

exports.Add = Add
exports.GetAll = GetAll
exports.FindById = FindById
exports.Update = Update
exports.Delete = Delete