const fs = require('fs')
const path = require('path')

fs.writeFile(__dirname + '/project-dist/bundle.css','\n',function () {})

fs.readdir(path.join(__dirname, "styles"), (err, files) => {
    for (let file of files ) {
        if (path.extname(file) == ".css") {
            const myReadStream = fs.createReadStream(path.join(__dirname, "styles", file), 'utf-8');
            myReadStream.on('data', (chunk) => {
                fs.appendFile(__dirname + '/project-dist/bundle.css',chunk.toString() + '\n',() => {})
                console.log(`Содержимое файла ${file} перезаписанно в файл bundle.css`)
            });
        }
    }
})

