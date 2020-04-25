const express=require('express');
const conditionFront=require('./conditionFront')
const notificationFront=require('./notificationFront')
const notificationBack=require('./notificationBack')
const router = express.Router();
module.exports = () => 
{
   router.use('/conditionFront',conditionFront())
   router.use('/noticationFront',notificationFront())
   router.use('/notificationBack',notificationBack())
   return router;
};