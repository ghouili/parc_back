const car = require('../Models/car');
const fs = require('fs');

const GetAll = async (req, res) => {

    let existcars
    try {
        existcars = await car.find().populate('chauffeur');
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existcars });

}

const Add = async (req, res) => {

    const {
        number,
        brand,
        type,
        fuelType,
        // chauffeur,
    } = req.body;
    console.log(req.body);
    console.log(req.file);
    let picture = 'car.png';
    if (req.file) {
        picture = req.file.filename;
    }

    const Newcar = new car({
        number,
        brand,
        type,
        fuelType,
        picture,
        // chauffeur,
    });

    try {
        await Newcar.save();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(201).json({ success: true, message: 'success', data: Newcar });
}

const FindById = async (req, res) => {

    const { id } = req.params;

    let existcar
    try {
        existcar = await car.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existcar) {
        return res.status(200).json({ success: false, messgae: 'car doesnt exist!!', error: false });
    }

    return res.status(200).json({ success: true, message: 'success', data: existcar });

}

const Update = async (req, res) => {

    const {
        brand,
        type,
        fuelType,
        panne,
        ispanne,
        chauffeur    } = req.body;

    const { id } = req.params;

    // console.log(req.body);

    let existcar
    try {
        existcar = await car.findById(id);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existcar) {
        return res.status(200).json({ success: false, messgae: 'car doesnt exist!!', error: false });
    }


    if (req.file) {
        if (existcar.picture && existcar.picture !== "car.png") {
            let path = `./uploads/images/${existcar.picture}`;
            try {
                fs.unlinkSync(path);
                //file removed
            } catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: error, error: error })
            }
        }
        existcar.picture = req.file.filename;
    }

    if ( brand) existcar.brand = brand;
    if ( panne) existcar.panne = panne;
    if ( ispanne) existcar.ispanne = ispanne;
    if ( type) existcar.type = type;
    if ( fuelType) existcar.fuelType = fuelType;
    if ( chauffeur) existcar.chauffeur = chauffeur;

    try {
        await existcar.save();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error.errors })
    }

    return res.status(200).json({ success: true, message: 'success', data: existcar });
}

const Delete = async (req, res) => {

    const { id } = req.params;

    let existcar
    try {
        existcar = await car.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existcar) {
        return res.status(200).json({ success: false, messge: 'car doesnt exist!!', error: false });
    }

    if (req.file && existcar.picture && existcar.picture !== "car.png") {

        let path = `./uploads/images/${existcar.picture}`;
        try {
            fs.unlinkSync(path)
            //file removed
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error, error: error })
        }
    }

    try {
        await existcar.deleteOne();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }
    return res.status(200).json({ success: true, message: 'car Deleted Successfully' });

}

exports.Add = Add
exports.GetAll = GetAll
exports.FindById = FindById
exports.Update = Update
exports.Delete = Delete