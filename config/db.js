const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://service_db_user:0jOGKqj6dfJPO06N@clusterservice.i5swrvh.mongodb.net/?appName=ClusterService');
    console.log('MongoDB\'ye başarıyla bağlandı');
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error);
    process.exit(1); // Uygulamayı kapatır
  }
};

module.exports = connectDB;
