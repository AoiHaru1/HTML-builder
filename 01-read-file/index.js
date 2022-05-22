const fs = require('fs');
const process = require('process');

fs.ReadStream('./01-read-file/text.txt').on('data', (data) => {
  data ?  process.stdout.write(data.toString()) : null;
});
