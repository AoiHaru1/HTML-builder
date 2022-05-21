const fs = require('fs');

const stream = fs.ReadStream('./01-read-file/text.txt');

stream.on('data', (data) => {
  data ? console.log(data.toString()) : null;
});
