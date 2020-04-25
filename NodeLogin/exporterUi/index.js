const express=require('express');

const ContractPage = require('./ContractPage');
const FarmerProfDisplay= require('./FarmerProfDisplay');
const Trending=require('./Trending');
const location=require('./location')
const UpdateFarmerDescription=require('./farmerDescription')

const DisplayDistrics=require('./DisplayDistricts')
const MapTable=require('./MapTable')


const router = express.Router();

module.exports = () => 
{
    router.use('/ContractPage',ContractPage());
    router.use('/FarmerProfDisplay',FarmerProfDisplay());
    router.use('/VegetableImports',Trending());
    router.use('/LocationVegetables',location());
    router.use('/updateFarmerData',UpdateFarmerDescription())
    router.use('/MapTable',MapTable())
    router.use('/updateFarmerData',UpdateFarmerDescription());
    router.use('/sendFarmerLocations',DisplayDistrics());


     return router;
};