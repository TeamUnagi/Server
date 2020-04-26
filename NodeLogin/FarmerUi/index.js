const express=require('express');
const conditionFront=require('./conditionFront')
const notificationFront=require('./notificationFront')
const notificationBack=require('./notificationBack')
const ContractInfoToFarmer=require('./showContractInfo')
const FarmerContracts=require('./contracts')
const conditionBack=require('./conditionBack')
const accept=require('./Accept');

const router = express.Router();
module.exports = () => 
{
   router.use('/conditionFront',conditionFront())
   router.use('/noticationFront',notificationFront())
   router.use('/notificationBack',notificationBack())
   router.use('/sendContractInfoToFarmer',ContractInfoToFarmer());
   router.use('/sendExporterContracts',FarmerContracts());
   router.use('/conditionBack',conditionBack());

   router.use('/Accept',accept())
   return router;
};