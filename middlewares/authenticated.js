const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

const isAuthenticated = async (req, res, next) => {//next means whenever we call this function it will go to next middleware means to next function
    try {
        //remember this
        const authheader = req.headers.authorization;// ["Bearer", "{TOKEN}"] this will be stored in authheader
        if (!authheader) {
            return res.status(401).json({ err :  "authorization header not found"})
        }
        //Getting token out of authheader
        const token = authheader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ err :  "Token not found"})
        }
        //Now we decode the code(bearer)
        const decoded = jwt.verify(token, "SECRET MESSAGE")
        //this decoded will give us the this 
        //  { user: { id: existingUser.id } }; 
        //  object
        const user = await User.findOne({ where: { id: decoded.user.id } });
        if (!user) {
            return res.status(404).json({ err :  "User not found"})
        }
        //we will extend 
        req.user = user; 
        next();//calling next middleware

    }
    catch (e) {
        return res.status(500).send(e);
    }
}
/*
* const a ={}
* a.egs =123
*
*a = {egs:123 }
*/


// this req, and res is same as req,res of isAuthenticated
const isSeller = async (req, res, next) => { 
    if (req.user.dataValues.isSeller) {// we do not have to recall the database
        next();
    }
    else {
        return res.status(401).json({ err: "You are not seller" });
    }
}

module.exports = { isAuthenticated, isSeller };