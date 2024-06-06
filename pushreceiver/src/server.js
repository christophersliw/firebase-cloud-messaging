const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

console.log(__dirname);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// Middleware to serve static files from the dist directory
app.use('/', express.static(__dirname));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port);


console.log(':)Server started at http://localhost:' + port);