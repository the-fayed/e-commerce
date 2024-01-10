const mongoose = require(`mongoose`);

const dbConnection = () => {
  try {
    const isConnected = mongoose.connect(process.env.DB_CONNECTION_STRING);
    if (isConnected) console.log(`Database connected`);
  } catch (error) {
    console.log('Error while connecting with data base', error);
  }
};

module.exports = dbConnection;
