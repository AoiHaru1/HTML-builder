const fsPromises = require('fs/promises');
const fs = require('fs');
const PATH = require('path');

fsPromises.mkdir(__dirname + '/files-copy', { recursive: true });

const copyFunc = async () => {
  const path = PATH.resolve(__dirname, './files');
  const outputPath = PATH.resolve(__dirname, './files-copy');

  fs.readdir(outputPath, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(outputPath + `/${file}`, err => {
        if (err) throw err;
      });
    }
  });

  const files = await fsPromises.readdir(path, { withFileTypes: true });
  files.forEach(x => {
    fs.copyFile(path + `/${x.name}`, outputPath + `/${x.name}`, () => {});
  });
};


copyFunc();
