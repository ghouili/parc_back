const express = require('express');
const maintenanceController = require('../Controllers/maintenance');

const route = express.Router();

route.get('/', maintenanceController.GetAll);

route.get('/:id', maintenanceController.FindById);

route.put('/:id', maintenanceController.Update);

route.delete('/:id', maintenanceController.Delete);

route.post('/add', maintenanceController.Add);

module.exports = route;