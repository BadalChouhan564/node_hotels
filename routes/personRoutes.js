const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');


// post route to add the person

router.post('/', async (req, res) => {

    try{
      const data = req.body  // asuming the request body contains the person data.
  
  // create a new person document using the mongoose model
  
  const newPerson = new Person(data);
  newPerson.name = data.name;
  
  // save the new person of the database
       const responce = await newPerson.save();
       console.log('data saved');
       res.status(200).json(responce);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internel server errror'});
    }
    
  })

  // get method tomget the person
router.get('/', async (req, res) => {
    try {
      const data = await Person.find();
      console.log('data fetched');
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({error: 'Internel server errror'});
    }
  })

  router.get('/:workType', async(req, res)=>{
    try{
      const workType = req.params.workType; // extract the worktype from the url parameter
      if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
        const responce = await Person.find({work: workType});
        console.log('responce fetched');
        res.status(200).json(responce);
      }else{
        res.status(404).json({error: 'invalid work type'});
      }
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internel server errror'});
    }
  })
  
  router.put('/:id', async(req, res)=>{
    try {
        const personId = req.params.id; // Extract the person's ID from the URL parameter
        const updatedPersonData = req.body; // Updated data for the person
    
        // Assuming you have a Person model
        const responce = await Person.findByIdAndUpdate(personId, updatedPersonData, {
          new: true, // Return the updated document
          runValidators: true, // Run Mongoose validation
        })
    
        if (!responce) {
          return res.status(404).json({ error: 'Person not found' });
        }
    
        // Send the updated person data as a JSON response
        console.log('data updated');
        res.status(200).json(responce);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
      }
    
  })

  router.delete('/:id', async(req, res)=>{
    try {
        const personId = req.params.id; // Extract the person's ID from the URL parameter
    
        // Assuming you have a Person model
        const responce = await Person.findByIdAndDelete(personId);
       if (!responce) {
          return res.status(404).json({ error: 'Person not found' });
        }
        console.log('data delete');
        res.status(200).json({message: 'person deleted succesfully'});
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
      }
    
  })


  module.exports = router;