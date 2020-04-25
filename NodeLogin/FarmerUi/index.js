const express=require('express');
const conditionFront=require('./conditionFront')
const notificationFront=require('./notificationFront')
const notificationBack=require('./notificationBack')
const ContractInfoToFarmer=require('./showContractInfo')
const FarmerContracts=require('./contracts')


const router = express.Router();
module.exports = () => 
{
   router.use('/conditionFront',conditionFront())
   router.use('/noticationFront',notificationFront())
   router.use('/notificationBack',notificationBack())
   router.use('/sendContractInfoToFarmer',ContractInfoToFarmer());
   router.use('/sendExporterContracts',FarmerContracts());


   return router;
};