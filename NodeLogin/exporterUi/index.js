const express=require('express');

const ContractPage = require('./ContractPage');
const FarmerProfDisplay= require('./FarmerProfDisplay');
const Trending=require('./Trending');
const location=require('./location')
const UpdateFarmerDescription=require('./farmerDescription')
<<<<<<< HEAD
const MapTable=require('./MapTable')
=======
const DisplayDistrics=require('./DisplayDistricts')


>>>>>>> f2e0143d70caedaf4b4cce868fe8a11bcfe406ec
const router = express.Router();

module.exports = () => 
{
    router.use('/ContractPage',ContractPage());
    router.use('/FarmerProfDisplay',FarmerProfDisplay());
    router.use('/VegetableImports',Trending());
    router.use('/LocationVegetables',location());
<<<<<<< HEAD
    router.use('/updateFarmerData',UpdateFarmerDescription())
    router.use('/MapTable',MapTable())
=======
    router.use('/updateFarmerData',UpdateFarmerDescription());
    router.use('/sendFarmerLocations',DisplayDistrics());

>>>>>>> f2e0143d70caedaf4b4cce868fe8a11bcfe406ec
    return router;
};