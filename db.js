const mongoose = require('mongoose');

// define the mongoDb url

const mongoURL = 'mongodb://localhost:27017/hotels' 
// hotels is databese name we also changed

// setup mongodb connection
mongoose.connect(mongoURL, {
  // useNewUrlParser: true,
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