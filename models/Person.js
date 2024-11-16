const { HostAddress } = require('mongodb');
const mongoose = require('mongoose');

// define the person schema

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['chef', 'manager', 'waiter'],
        required:true
    },
    mobile: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required : true,
        unique: true
    },
    address:{
        type: String,
    },
    salery: {
        type: Number,
        required: true
    },
    username: {
       required: true,
       type: String 
    },
    password: {
        required: true,
        type: String
    }
});

personSchema.pre('save', async function(next) {
    const person = this;
    
    // hash password only if it has been modified  (or is mew)
    if(!personSchema.isModified('password')) return next();

    try {
        // hash password genrator
        const salt = await bcrypt.genSalt(10);
        // hash password 
        const hashedPassword = await bcrypt.hashPassword(person.password, salt);
        
        // override the plain password with the hashed one
        person.password = hashedPassword;
        next();
    } catch (err) {
        return next(err);
    }

})

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        // use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch();
    } catch (err) {
        throw err;
    }
    
}

// crate person model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;