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
    }
});

// crate person model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;