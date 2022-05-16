const process = require('process');
const fs = require('fs');

fs.access('./02-write-file/text.txt', (err) => {
  if (err) {
    fs.writeFile('./02-write-file/text.txt', '', () => { });
  }
});

console.log('Здравствуйте. Введите ваше сообщение в консоль для последующей записи в файл.');

const goodByeFunc = () => console.log('До новой встречи.');

process.stdin.on('data', data => {
  const string = data.toString();
  if (string === 'exit\r\n') {
    process.stdin.destroy();
    goodByeFunc();
    return;
  }
  fs.writeFile('./02-write-file/text.txt', string, { flag: 'a+'}, () => { });
});

process.on('SIGINT', () => {
  goodByeFunc();
  process.exit();
});