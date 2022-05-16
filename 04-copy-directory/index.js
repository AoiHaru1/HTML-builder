const fsPromises = require('fs/promises');
const PATH = require('path');

console.log(__dirname);

fsPromises.mkdir(__dirname + './files', { recursive: true});