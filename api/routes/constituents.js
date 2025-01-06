const express = require("express");
const router = express.Router();
const controller = require("./../controllers/constituentController");

// GET
router.get('/', controller.getAllConstituents); 

// ADD 
router.post('/', controller.createConstituent);

// EDIT 
router.put('/', controller.updateConstituent);

// DELETE 
router.delete('/:id', controller.deleteConstituent);

module.exports = router;