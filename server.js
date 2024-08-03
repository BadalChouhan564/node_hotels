const express = require('express')
const app = express();
const db = require('./db');

const bodyParser = require('body-parser'); 
app.use(bodyParser.json());





app.get('/', function (req, res) {
  res.send('Welcome to my hotel! how can i help you')
})





// import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRouutes = require('./routes/menuItemRoutes');

// use the router 
app.use('/person', personRoutes);
app.use('/menu', menuItemRouutes);

app.listen(3000, ()=>{
  console.log('listening on port 3000');
})
