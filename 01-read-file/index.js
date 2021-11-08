const fs = require('fs');

const myReadStream = fs.createReadStream(__dirname + '/text.txt', 'utf-8');
myReadStream.on('data', (chunk) => {
  process.stdout.write(chunk)
});
