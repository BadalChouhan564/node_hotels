const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');


// post method for menu item
router.post('/', async (req, res) => {
    try {
      const menuItemData = req.body; // Assuming the request body contains menu item data
  
      // Create a new menu item using the Mongoose model
      const menuItem = new MenuItem(menuItemData);
  
      // Save the new menu item to the database
      const menu_data = await menuItem.save();
  
      console.log('Menu item saved');
      res.status(201).json(menu_data);
    } catch (error) {
      console.error('Error creating menu item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  // get method for menu item
  router.get('/', async (req, res) => {
    try {
      // Use the Mongoose model to find all menu items in the database
      const menuItems = await MenuItem.find();
  
      // Send the list of menu items as a JSON response
      res.json(menuItems);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  module.exports = router;  