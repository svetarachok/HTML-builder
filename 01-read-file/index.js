const path = require('path');
const fs = require('fs');

const pathToText = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(`${pathToText}`, 'utf-8');

let data = '';
stream.on('data', chunk => { 
  data += chunk;
  console.log(data)}
  );