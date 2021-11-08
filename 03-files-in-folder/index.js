const fs = require('fs')
const path = require('path')

fs.readdir(path.join(__dirname, "secret-folder"), (err, files) => {
    for (let file of files ) {
        fs.stat(path.join(__dirname, "secret-folder", file), (err, element) => {
            if(!element.isDirectory()) {
                console.log(file.split(".")[0] + "  " + path.extname(file) + "  " + element.size / 1000 + "kb"  )
            }
        })
    }
})
