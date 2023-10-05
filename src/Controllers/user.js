const bcrypt = require('bcryptjs');
const user = require('../Models/user');
const fs = require('fs');
const generator = require('generate-password');




const GetAllChauffeur = async (req, res) => {

    let existUsers
    try {
        existUsers = await user.find({ role: 'chauffeur', mission: null });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existUsers });

}

const GetAll = async (req, res) => {

    let existUsers
    try {
        existUsers = await user.find();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existUsers });

}

const Add = async (req, res) => {

    const { cin, nom, prenom, tel, role, niveau, competence, date_embouche } = req.body;
    console.log(req.body);
    console.log(req.file);
    let avatar = 'avatar.png';
    if (req.file) {
        avatar = req.file.filename;
    }

    let existUser
    try {
        existUser = await user.findOne({ cin: cin });
        console.log(existUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (existUser) {
        return res.status(400).json({ success: false, message: 'user Already exist!!', error: false });
    }

    let password;
    if (req.body.password) {
        password = req.body.password;
    } else {
        password = generator.generate({
            length: 8,
            numbers: true
        });
    }
    // const hashedPassword = bcrypt.hashSync(password, 10);

    const NewUser = new user({
        cin,
        nom,
        prenom,
        niveau,
        competence,
        date_embouche,
        tel,
        password,
        avatar,
        role,
    });

    try {
        await NewUser.save();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(201).json({ success: true, message: 'success', data: NewUser, password: password });
}

const Login = async (req, res) => {
    //recieve data:
    const { cin, password } = req.body;

    //check user if exist:
    let existUser
    try {
        existUser = await user.findOne({ cin: cin });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existUser) {
        return res.status(200).json({ success: false, message: 'user doesnt exist!!', error: false });
    }

    if (!existUser.active) {
        return res.status(200).json({ success: false, message: 'Your account isnt activated yet!!', error: false });
    }
    console.log(existUser);
    //compare password:
    let check = await bcrypt.compare(password, existUser.password);

    if (!check) {
        return res.status(200).json({ success: false, message: 'Check your password!!', error: false, data: existUser });
    }

    return res.status(200).json({ success: true, message: `Welcome Mr/Mr(s) ${existUser.nom}`, data: existUser });

}

const FindById = async (req, res) => {

    const { id } = req.params;

    let existUser
    try {
        existUser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existUser) {
        return res.status(200).json({ success: false, messgae: 'user doesnt exist!!', error: false });
    }

    return res.status(200).json({ success: true, message: 'success', data: existUser });

}

const Update = async (req, res) => {

    const {
        cin, nom, prenom, tel, role, niveau, competence, date_embouche
    } = req.body;

    const { id } = req.params;

    // console.log(req.body);

    let existUser
    try {
        existUser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existUser) {
        return res.status(200).json({ success: false, messgae: 'user doesnt exist!!', error: false });
    }

    let hashedPassword;
    if (req.body.oldpassword) {
        //compare password:
        let check = await bcrypt.compare(req.body.oldpassword, existUser.password);

        if (!check) {
            return res.status(200).json({ success: false, message: 'the old password is incorrect!!', error: false });
        }
        if (!req.body.newpassword) {
            return res.status(200).json({ success: false, message: 'the new password is missing!!', error: false });
        }
        const salt = await bcrypt.genSalt();
        hashedPassword = await bcrypt.hash(req.body.newpassword, salt);
        existUser.password = hashedPassword;
    }

    if (req.file) {
        if (existUser.avatar && existUser.avatar !== "avatar.png") {
            let path = `./src/uploads/images/${existUser.avatar}`;
            try {
                fs.unlinkSync(path);
                //file removed
            } catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: error, error: error })
            }
        }
        existUser.avatar = req.file.filename;
    }



    existUser.role = role;



    existUser.cin = cin;
    existUser.nom = nom;
    existUser.prenom = prenom;
    existUser.tel = tel;
    existUser.competence = competence;
    existUser.niveau = niveau;
    existUser.date_embouche = date_embouche;


    try {
        await existUser.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error.errors })
    }

    return res.status(200).json({ success: true, message: 'success', data: existUser });
}


const Delete = async (req, res) => {

    const { id } = req.params;

    let existUser
    try {
        existUser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existUser) {
        return res.status(200).json({ success: false, messge: 'user doesnt exist!!', error: false });
    }

    if (req.file && existUser.avatar && existUser.avatar !== "avatar.png") {

        let path = `./uploads/images/${existUser.avatar}`;
        try {
            fs.unlinkSync(path)
            //file removed
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error, error: error })
        }
    }

    try {
        await existUser.deleteOne();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }
    return res.status(200).json({ success: true, message: 'User Deleted Successfully' });

}

exports.Add = Add
exports.GetAll = GetAll
exports.GetAllChauffeur = GetAllChauffeur
exports.Login = Login
exports.FindById = FindById
exports.Update = Update
exports.Delete = Delete