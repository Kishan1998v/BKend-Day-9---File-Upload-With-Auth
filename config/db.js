const { Sequelize } = require('sequelize')
//Creating a database
const createDB = new Sequelize('test-db', 'user', 'pass', {
    dialect: 'sqlite',
    host:'./config/db.sqlite'
});

//Connecting Database
const connectDB = () => {
    createDB.sync().then(() => {
        console.log('connected to db');
    })
    .catch(e=> {
        console.log('db connection failed :', e);
    })
}

module.exports = { createDB ,connectDB };