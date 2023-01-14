//Creating ExpressRoute
const express = require('express');
const router = express.Router();

// Importing User from userModels 
const User = require('../models/userModels');

//Importing Bcrypt
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Creating a Validate Info
// Getting from validators.js in utils
const {
    validateName,
    validateEmail,
    validatePassword
} = require('../utils/validators');


//Creating a Singup Api
router.post("/signup", async (req, res) => {
    try { 
      //1 Getting Credentails from SignUp Page:
        const { name, email, password, isSeller } = req.body;
      //2 Checking Wheather the User already Present in Our database or not?
        const existingUser = await User.findOne({ where: { email:email } });

      //3 Checking EdgeCases
        // If USer Exist we ask him to login
        if (existingUser) {
            return res.status(403).json({ err: "User already Exits" });
        }
        //Now We check wheather Name Validates or  not
        if (!validateName(name)) {
            console.log("name")
            return res.status(400).json({ err: "Name Validate fails" });
        }
        if (!validateEmail(email)) {
            console.log("email")
            return res.status(400).json({ err: "Email Validate fails" });
        }
        if (!validatePassword(password)) {
            console.log("pass" ,password)
            return res.status(400).json({ err: "Error: Invalid password: password must be at least 8 characters long and must include atleast one - one uppercase letter, one lowercase letter, one digit, one special character" });
        }
        
    //4 If everthing is OK!
        // We hash the password
        const hashPassword = await bcrypt.hash(password, (saltOrRounds=10))//we can create some salts (means before and after padding)
    //5 We have the User 
        const user = {
            name,
            email,
            password: hashPassword,
            isSeller: isSeller || false,
        };
    //6 Now we Store the user in User Module
        const createdUser = await User.create(user);
    //7 We return
        return res.status(201).json({
            message: `Welcome ${createdUser.name}`,
        })
    }
    catch (e) {
        return res.status(500).send(e);
    }
})

//Creating signIn Api
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email.length === 0) {
            
            return res.status(400).json({ err: "Please provide Email" });
        }
        if (password.length === 0) {
            return res.status(400).json({ err: "Please provide password" });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (!existingUser) {
            return res.status(404).json({
                err: "USer not found"
            })
        }
        const passwordMatch = await bcrypt.compare(password , existingUser.password )
        if (!passwordMatch) {
            return res.status(403).json({
                err: "Email or Password Doesnot Match"//we never write just password mismatch because it becomes easy to hack 
            })
        }
        const payload = { user: { id: existingUser.id } };
        const bearerToken = await jwt.sign(payload, "SECRET MESSAGE", {
            expiresIn: 360000,// this can be converted into the object using SECRET MESSAGE 
        });
        //in cookies it's specificly key value pairs 
        res.cookie('t', bearerToken, { expire: new Date() + 9999 });

        return res.status(200).json({
            bearerToken
        })
     }
    catch (e) {
        console.log(">>>>>>", e);
        return res.status(500).send(e)
    }
})

//Creating the SignOut
router.get("/signout", (req, res) => {
    try {
        res.clearCookie('t')//'t' is key of cookie
        return res.status(200).json({ message: "cookie deleted" });
    }
    catch (e) {
        return res.status(500).send(e)
    }
});

module.exports = router;