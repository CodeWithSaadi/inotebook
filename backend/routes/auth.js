var express = require('express');
const User = require('../models/User');
var router = express.Router();
const { body, validationResult } = require('express-validator');    //import express validator

const bcrypt = require('bcryptjs');     //import bcryptjs
var jwt = require('jsonwebtoken');    //import jsonwebtoken
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'Harryisagoodb$ou';        // my secret sign



//ROUTE 1 --  Create a user using: POST "api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password  must be at least 5 characters ').isLength({ min: 5 })
], async (req, res) => {
    let success = false
    //If ther are errors, return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {   // try-catch is used to check error -- inside (if not use we can not understand the error is because of repeating unique key or some else)

        //Check whether the user with this email exist already
        let user = await User.findOne({ email: req.body.email })
        if (user) {

            return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10);                               // Generate salt of password
        const secPass = await bcrypt.hash(req.body.password, salt)     // secPass -- Hashing
        //create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        //To send TOKEN


        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true
        res.json({ success, authtoken })
        // res.json({ "Congratulations": "Your account is registered successfully", user })      // not send because we want to return token to user
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Errors')
    }
})


// ROUTE 2 -- Authenticate a user using: POST "api/auth/login". No login required
router.post('/login', [

    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password  cannot be blank ').exists()
], async (req, res) => {
    let success = false
    //If there are errors, return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;   //move password and email from req.body
    try {                                   // try-catch is used to check error -- inside (if not use we can not understand the error is because of repeating unique key or some else)

        //Check whether the user with this email exist already
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }


        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {

            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true
        res.json({ success, authtoken })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Errors')
    }
})





// ROUTE 3 -- Get loggedIn User detail using : POST "api/auth/getuser".   login required

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Errors');
    }
})



// ROUTE 4 -- Update User detail using : POST "api/auth/getuser".   login required

router.put('/updateuser/:id', fetchuser, async (req, res) => {
    const { name, password } = req.body;
    try {


        //Create a New Note Object
        const newUser = {}; 
        if (name) { newUser.name = name };
        // if (description) { newNote.description = description };
        if (password) { newUser.password = password };

        //find a new note to be Updated and update it
        userId = req.user.id;
        let user = await User.findById(userId);                 //confirm user is exist by this id or not
        if (!user) { return res.status(404).send("Not Found") }

        //Alow deletion only if user own this Note
        if (user.id.toString() !== req.user.id) {                  // confirm the user trying to access notes by there own id or other -- unauthorized user   
            return res.status(401).send("Not Allowed")
        }

        user = await User.findByIdAndUpdate(userId, { $set: newUser }, { new: true });                // all conditions is true -- authorized user
        res.json({ user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})








module.exports = router


































//FIRst attempt
// .then(user => res.json(user))
//     .catch(err => console.log(err))           //to show error --duplicate value
// res.json({ error: 'Please enter a unique value for email' })






//First attempt
// Create a user using: POST '/api/auth'. Does'nt required Auth
// router.post('/', (req, res) => {
//     const user = User(req.body);
//     user.save();
//     console.log(req.body);

//     // res.json(obj)
//     res.send(req.body);

// })