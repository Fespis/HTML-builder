const fs = require('fs')
const path = require('path')

fs.mkdir(__dirname + '/files-copy', (err) => {})
fs.readdir(path.join(__dirname, 'files-copy'), (err, unlinkFiles) => {
    for (let unlinkFile of unlinkFiles ) {
        fs.unlink(path.join(__dirname, 'files-copy',unlinkFile), err => {});
    }
})
fs.readdir(path.join(__dirname, "files"), (err, files) => {
    for (let file of files ) {
        fs.copyFile(__dirname +`/files/${file}`, __dirname +`/files-copy/${file}`, (err) => {
            console.log(`${file} был скопирован в папку files-copy`);
        });
    }
})
