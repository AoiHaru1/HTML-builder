const fs = require('fs');
const fsPromises = require('fs/promises');
const PATH = require('path');

const bundlePath = PATH.resolve(__dirname, 'bundle');
const stylesPath = PATH.resolve(__dirname, 'styles');

fsPromises.mkdir(bundlePath, { recursive: true });


// css bundle

const cssBundle = async () => {
  const files = await fsPromises.readdir(stylesPath, { withFileTypes: true });
  files.forEach(x => {
    const ext = x.name.split('.');
    if (ext[ext.length - 1] === 'css') {
      const stream = fs.ReadStream(stylesPath + `/${x.name}`);
      stream.on('data', (data) => {
        fs.writeFile(bundlePath + '/style.css', `\n ${data}`, { flag: 'a+' }, () => { });
      });
    }
  });
};

cssBundle();


fsPromises.mkdir(bundlePath + '/assets', { recursive: true });


const listOfFiles = async (path, outputPath) => {
  const files = await fsPromises.readdir(path, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile()) {
      await fsPromises.copyFile(path + `/${file.name}`, outputPath + `/${file.name}`);
    } else {
      fsPromises.mkdir(bundlePath + '/assets' + `/${file.name}`, { recursive: true });
      await listOfFiles(path + `/${file.name}`, outputPath + `/${file.name}`);
    }
  }
  return;
};

listOfFiles(__dirname + '/assets', __dirname + '/bundle' + '/assets');

const stream = fs.ReadStream(PATH.resolve(__dirname, 'template.html'));

const htmlBundle = async () => {
  let htmlString;
  stream.on('data', (data) => {
    htmlString = data.toString();
  });

  await stream.on('end', async () => {
    const files = await fsPromises.readdir(__dirname + '/components', { withFileTypes: true });
    for (const file of files) {
      const copyContentStream = fs.ReadStream(PATH.resolve(__dirname, 'components', file.name));

      copyContentStream.on('data', (data) => {
        const regex =  new RegExp(`{{${file.name.split('.')[0]}}}`,'g');
        htmlString = htmlString.replace(regex, data.toString());
        fs.writeFile(bundlePath + '/index.html', htmlString, () => { });
      });
    }
  });
};


htmlBundle();