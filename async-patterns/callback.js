
const fs = require('fs');

fs.readFile('../content/first.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
  