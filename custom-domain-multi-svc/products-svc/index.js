const serverless = require('serverless-http');
const express = require('express');
const app = express();

// GET get all products endpoint
app.get('/products', function(req,res) {
  const products = [{
    productId: 'WIDGET001001',
    name: 'Widget 1001'
  },{
    productId: 'FLOWBEE8032',
    name: 'Flow Bee Hair Trimmer'
  },{
    productId: 'STARRY4021',
    name: 'Starry Night Light'
  }];

  res.json(products);
});

module.exports.handler = serverless(app);