const mongoose = require('mongoose');

const mongoDB = 'mongodb://127.0.0.1:27017/test';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', err => {
  console.error('❌ Error de conexión:', err.message);
});

db.once('open', () => {
  console.log('✅ Conexión exitosa a MongoDB');
  mongoose.disconnect();
});
