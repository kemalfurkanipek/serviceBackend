const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

// Route dosyalarını içe aktar
const studentRoutes = require('./routes/students');
const schoolRoutes = require('./routes/schools');
const serviceRoutes = require('./routes/services');
const accountRoutes = require('./routes/accounts');

const app = express();

// CORS Middleware'i ekleyin
app.use(cors());

app.use(bodyParser.json());

// MongoDB bağlantısını başlat
connectDB();

// Route'ları kullan
app.use('/students', studentRoutes);
app.use('/schools', schoolRoutes);
app.use('/services', serviceRoutes);
app.use('/accounts', accountRoutes);

// Sunucuyu başlat
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
