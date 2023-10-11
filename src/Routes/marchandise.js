const express = require('express');
const marchandiseController = require('../Controllers/marchandise');

const route = express.Router();

route.get('/', marchandiseController.GetAll);

route.get('/mission', marchandiseController.GetAllMission);

route.get('/:id', marchandiseController.FindById);

route.put('/:id', marchandiseController.Update);

route.delete('/:id', marchandiseController.Delete);

route.post('/add', marchandiseController.Add);

module.exports = route;