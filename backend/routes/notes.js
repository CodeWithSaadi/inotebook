var express = require('express')
var router = express.Router()
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');    //import express validator



// ROUTE 1 -- Get all Notes using : GET "api/note/fetchallnotes".   login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const note = await Note.find({ user: req.user.id });
        res.json(note)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Errors');
    }
})



// ROUTE 2 -- Add a new Note using : POST "api/note/addnote".   login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid name').isLength({ min: 3 }),
    body('description', 'description must be at least 5 character ').isLength({ min: 5 }),
    body('tag', 'tag must be at least 5 character ').isLength({ min: 3 }),
], async (req, res) => {
    try {


        const { title, description, tag } = req.body;
        //If there are errors, return Bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save()
        res.json(saveNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})


// ROUTE 3 -- Update an Existing Note using : PUT "api/note/updatenote".  login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {


        //Create a New Note Object
        const newNote = {}; 
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find a new note to be Updated and update it

        let note = await Note.findById(req.params.id);                 //confirm user is exist by this id or not
        if (!note) { return res.status(404).send("Not Found") }

        //Alow deletion only if user own this Note
        if (note.user.toString() !== req.user.id) {                  // confirm the user trying to access notes by there own id or other -- unauthorized user   
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });                // all conditions is true -- authorized user
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})
 


// ROUTE 4 -- Delete an existing Note using : DELETE "api/note/deletenote".  login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {

        //find a new note to Deleted and delete it
        let note = await Note.findById(req.params.id);                 //confirm user is exist by this id or not
        if (!note) { return res.status(404).send("Not Found") }

        // Alow deletion only if user own this Note
        if (note.user.toString() !== req.user.id) {                  // confirm the user trying to access notes by there own id or other -- unauthorized user   
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id);                // all conditions is true -- authorized user
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})




module.exports = router