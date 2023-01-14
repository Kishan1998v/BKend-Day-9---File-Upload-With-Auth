const { isAuthenticated, isSeller } = require('../middlewares/authenticated');// there is no difference in between middlewares and functions.
const upload = require("../utils/fileUpload");
//Creating ExpressRoute
const express = require('express');
const { OK } = require('sqlite3');
const router = express.Router();



//Create Route
//we need to check wheather user is authenticated and isSeller or not before calling this 
router.post("/create", isAuthenticated, isSeller , (req, res) => {// this can have as many function and wiill be executed one-by-one
    upload(req, res, async (Error) => {
        if (Error) {
            console.log(Error);
            return res.status(500).send(Error);
        }
        //we will have 3 thing
        //1 will file 
        const { name, price } = req.body;
        if (!name || !price || !req.file) {
            return res.status(400).json({
                err: "Please Upload Correct things"
            })
        }
        if (Number.isNaN(price)) {
            return res.status(400).json({
                err: "Price should be number"
            })
        }

        let productDetails = {
            name,
            price,
            content: req.file.path
        }
        return res.status(200).json({
            status: OK,
            productDetails,
        })

    })
})

//______________________________________________
module.exports = router