//Getting Datatype from sequelize
const { DataTypes } = require('sequelize');
//getting createDB to Create a User moddle in DB;
const { createDB } = require('../config/db');

//Creating the USer Model ..
//what parameters we need For a single User :
const User = createDB.define("user", {
    //User Id
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    //User Name, Email , Pass , IsSeller(boolean)
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password:DataTypes.STRING,
    isSeller: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
    }
})

module.exports = User;