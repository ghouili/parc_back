const express = require('express');
const carController = require('../Controllers/car');
const fileuploader = require('../Middlewares/UploadFiles');

const route = express.Router();

route.get('/', carController.GetAll);

route.get('/:id', carController.FindById);

route.put('/:id', fileuploader.single('picture'), carController.Update);

route.delete('/:id', carController.Delete);

route.post('/add', fileuploader.single('picture'), carController.Add);

module.exports = route;