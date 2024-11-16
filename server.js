const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');


const bodyParser = require('body-parser'); 
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;


// middileware function.
const logRequest = (req, res, next) =>{
  console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
  next();
  
}
app.use(logRequest);




app.use(passport.initialize());

const localAuthmiddleware = passport.authenticate('local', {session: false}) 
app.get('/',function (req, res) {
  res.send('Welcome to my hotel! how can i help you')
  
})





// import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRouutes = require('./routes/menuItemRoutes');

// use the router 
app.use('/person',localAuthmiddleware, personRoutes);
app.use('/menu',  menuItemRouutes);

app.listen(PORT, ()=>{
  console.log('listening on port 3000');
})
