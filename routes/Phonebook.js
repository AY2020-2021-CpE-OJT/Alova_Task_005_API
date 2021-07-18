const express = require('express');
const router = express.Router();
const Phonebook = require('../models/Phonebook');
const verify = require('./verifyToken');

//GET
router.get('/',verify, async (req,res) =>{
    const getPhonebook = await Phonebook.find();
    res.json(getPhonebook);
});

//POST
router.post('/show',verify, async (req,res) =>{
    const newPhonebook = new Phonebook({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phoneNumber: req.body.phoneNumber
    });
    const savedPhonebook = await newPhonebook.save();
    res.json(savedPhonebook);
});


//DELETE
router.delete('/delete/:id',verify, async (req,res) =>{
    const deletePhonebook = await Phonebook.findByIdAndDelete({_id: req.params.id});
    res.json(deletePhonebook);
});

//UPDATE
router.patch('/update/:id',verify, async (req,res)=>{
    const updatePhonebook = await Phonebook.updateOne(
        {_id: req.params.id},
        {$set: req.body}
    );
    res.json(updatePhonebook);
});
module.exports = router;