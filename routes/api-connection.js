var express = require('express');
var router = express.Router();
bodyParser = require('body-parser');
const fetch = require('node-fetch');
const utf8 = require('utf8');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config();

router.get('/', async (req,res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var city = req.query.city
  try {
    const data = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+utf8.encode(city)+'&units=metric&appid='+process.env.apiKEY)
    .then(res => res.json())
    res.send(data)
  }
  catch (e) {
  }
})
router.get('/around', async (req,res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var lat = req.query.lat
  var lon = req.query.lon
  try {
    const data = await fetch('https://api.openweathermap.org/data/2.5/find?lat='+lat+'&lon='+lon+'&cnt=10&units=metric&appid='+process.env.apiKEY)
    .then(res => res.json())
    res.send(data)
  }
   catch(error) {
    res.status(error.response.status)
    return res.send(error.message);
  }
})

router.get('/forecast', async (req,res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var city = req.query.city
  try {
    const data = await fetch('https://api.openweathermap.org/data/2.5/forecast?q='+utf8.encode(city)+'&units=metric&appid='+process.env.apiKEY)
    .then(res => res.json())
    res.send(data)
  }
   catch(error) {
    res.status(error.response.status)
    return res.send(error.message);
  }
})




module.exports = router;

