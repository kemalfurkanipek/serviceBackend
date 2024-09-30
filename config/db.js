const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://kemalfurkanipek:2gNo12ETkGDwnk1i@cluster0.jkxxoc4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB\'ye başarıyla bağlandı');
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error);
    process.exit(1); // Uygulamayı kapatır
  }
};

module.exports = connectDB;
