const process = require('process');
const fs = require('fs');
const textPath = __dirname + '/text.txt';

fs.access(textPath, (err) => {
  if (err) {
    fs.writeFile(textPath, '', () => { });
  }
});

console.log('Здравствуйте. Введите ваше сообщение для последующей записи в файл.');

const goodByeFunc = () => console.log('До новой встречи.');

process.stdin.on('data', data => {
  const string = data.toString();
  if (string === 'exit\r\n') {
    process.stdin.destroy();
    goodByeFunc();
    return;
  }
  fs.writeFile(textPath, string, { flag: 'a+'}, () => { });
});

process.on('SIGINT', () => {
  goodByeFunc();
  process.exit();
});