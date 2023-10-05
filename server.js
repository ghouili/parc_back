const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors');

const UserRouter = require('./src/Routes/user');
const CarRouter = require('./src/Routes/car');
const MissionRouter = require('./src/Routes/mission');
const MarchandiseRouter = require('./src/Routes/marchandise');
const MaintenanceRouter = require('./src/Routes/maintenance');


const server = express();
const PORT = 5000;

server.use(bodyparser.json());
server.use(cors());

server.use("/src/uploads/images", express.static(path.join("src", "uploads", "images")));
server.get('/', (req, res) => {
    res.send('Hello chayma !');
});
;

server.use('/user', UserRouter);
server.use('/car', CarRouter);
server.use('/mission', MissionRouter);
server.use('/marchandise', MarchandiseRouter);
server.use('/maintenance', MaintenanceRouter);

mongoose.connect('mongodb+srv://admin:admin@parc.jqihfiy.mongodb.net/?retryWrites=true&w=majority')
.then(res => server.listen(PORT, () => console.log(`server is running on port ${PORT}`)))
.catch(err => console.log(err));
