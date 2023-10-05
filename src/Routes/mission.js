const express = require('express');
const missionController = require('../Controllers/mission');

const route = express.Router();

route.get('/', missionController.GetAll);

route.get('/marchandise', missionController.GetAllMarchandise);

route.get('/:id', missionController.FindById);

route.put('/:id', missionController.Update);

route.delete('/:id', missionController.Delete);

route.post('/add', missionController.Add);

module.exports = route;