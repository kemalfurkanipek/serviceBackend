const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('../config/db')

const studentRoutes = require('../routes/students')
const schoolRoutes = require('../routes/schools');
const serviceRoutes = require('../routes/services');
const accountRoutes = require('../routes/accounts');

const app = express();


app.use(cors());

app.use(bodyParser.json());

connectDB();

app.use('/students', studentRoutes);
app.use('/schools', schoolRoutes);
app.use('/services', serviceRoutes);
app.use('/accounts', accountRoutes);


module.exports = app