// set up password with local authantication stretegy.

const passport = require('passport');
const LocalStretagy = require('passport-local').Strategy;
const Person = require('./models/Person')

passport.use(new LocalStretagy(async (USERNAME, password, done) =>{
    // authantication logic here
    try{
     // console.log('Received Credential:', USERNAME, password);
      const user =await Person.findOne({username: USERNAME});
      if(!user)
        return done(null, false, { Message: 'incorrect username.' });
  
      const isPasswordMatch = user.comparePassword(password);
      if(isPasswordMatch){
        return done (null, user);
      }else{
        return done(null, false, {Message: 'incorrect password.'});
      }
    }catch(err){
      return done(err);
    }
   
  }))

  module.exports = passport;  // export configured passport