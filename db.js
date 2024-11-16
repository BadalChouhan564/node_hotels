const mongoose = require('mongoose');
require('dotenv').config();


// define the mongoDb url

const mongoURL = process.env.MONGODB_URL_LOCAL;
//const mongoURL = process.env.MONGODB_URL;
// hotels is databese name we also changed

// setup mongodb connection
mongoose.connect(mongoURL, {
 //  useNewUrlParser: true,
  // useUnifiedTopology: true
})

// get the default connection

const db = mongoose.connection;


// define event listener for database connection

db.on('connected', () => {
    console.log('connected to mongodb server');
});

db.on('error', (err) => {
    console.error('mongodb connection error',err);
});

db.on('disconnected', ()=> {
    console.log('mongodb disconnected');
});

// export the database connection

module.exports = db;