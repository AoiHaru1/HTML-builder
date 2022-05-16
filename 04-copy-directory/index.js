const fsPromises = require('fs/promises');


console.log(__dirname);

fsPromises.mkdir(__dirname + './files', { recursive: true});