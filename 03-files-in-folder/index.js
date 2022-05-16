const fsPromises = require('fs/promises');
const PATH = require('path');
const fs = require('fs');

const filesToShow = [];

const listOfFiles = async (path) => {
  const files = await fsPromises.readdir(path, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile()) {
      const fileInfo = [];
      const dir = PATH.resolve(path, file.name);
      const size = await new Promise((resolve) => {
        fs.stat(dir, (err, stats) => {
          return resolve(stats.size);
        });
      });
      file.name.split('.').forEach(x => fileInfo.push(x));
      fileInfo.push(size / 1024 + 'kb');
      filesToShow.push(fileInfo);
    }
  }
  return filesToShow;
};



const filesInfoOutput = async () => {
  const list = await listOfFiles(PATH.resolve(__dirname, './secret-folder'));
  setTimeout(() => list.map(x => console.log(x.join(' - '))), 0);
};

filesInfoOutput();