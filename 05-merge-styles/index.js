const fs = require('fs');
const fsPromises = require('fs/promises');

fs.writeFile('./05-merge-styles/project-dist/bundle.css', '', () => { });

const bundleFunc = async () => {
  const files = await fsPromises.readdir('./05-merge-styles/styles', { withFileTypes: true });
  files.forEach((x, i) => {
    const ext = x.name.split('.');
    if (ext[ext.length - 1] === 'css') {
      const stream = fs.ReadStream(`./05-merge-styles/styles/${x.name}`);
      stream.on('data', (data) => {
        if (!i) {
          fs.writeFile('./05-merge-styles/project-dist/bundle.css', `${data.toString()}`, { flag: 'a+' }, () => { });
        } else {
          fs.writeFile('./05-merge-styles/project-dist/bundle.css', `\n\n${data.toString()}`, { flag: 'a+' }, () => { });
        }
      });
    }
  });
};

bundleFunc();