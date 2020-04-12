const express=require('express');

const exporterSign = require('./exportersign');
const farmerSign = require('./farmersign');
const login = require('./loginuser');

const router = express.Router();

module.exports = () => 
{
    router.use('/exportersigninuserinfo',exporterSign());
    router.use('/Farmersigninuserinfo',farmerSign());
    router.use('/userLogin',login());
    
    return router;
};