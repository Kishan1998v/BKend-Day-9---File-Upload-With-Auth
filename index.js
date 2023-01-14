//Express Server
const express = require('express')
const app = express()
const PORT = 1338;

//Database
const { connectDB } = require('./config/db');
connectDB();

//Calling Routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');


//Middlewares
app.use(express.json());
express.static("Content");
app.use(express.urlencoded({ extends: false }));

//Creating API
//UserROUTES 
app.use('/api/v1/user', userRoutes);
//ProductROUTES
app.use('/api/v1/products', productRoutes);



app.get("/", async (_req, res) => {
    return res.status(200).send("API works");
  });

//Listening to
app.listen(PORT, () => {
    console.log("server is started" , PORT)
    //we are calling the connectDB when Server is ON
    
})