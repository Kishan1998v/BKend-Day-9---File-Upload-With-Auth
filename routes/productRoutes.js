const { isAuthenticated, isSeller } = require('../middlewares/authenticated');// there is no difference in between middlewares and functions.

//Creating ExpressRoute
const express = require('express');
const router = express.Router();



//Create Route
//we need to check wheather user is authenticated and isSeller or not before calling this 
router.post("/create", isAuthenticated, isSeller , (req, res) => {// this can have as many function and wiill be executed one-by-one
    
})

//______________________________________________
module.exports = router