const fs = require('fs');
const path = require('path')

fs.mkdir(path.join(__dirname, 'project-dist'), (err) => {})
fs.mkdir(path.join(__dirname,'project-dist', 'assets'), (err) => {})
fs.writeFile(path.join(__dirname,'project-dist', "index.html"),'\n', () => {} )
fs.writeFile(path.join(__dirname,'project-dist', "style.css"),'\n', () => {} )

//=========================Замена шаблонов в HTML
fs.readFile(path.join(__dirname, "template.html"), 'utf-8', (err, templatePage) => {
    fs.readdir(path.join(__dirname, "components"), (err, files) => {
        for (let file of files) {
            if (!(path.extname(file) == '.html'))  continue //Записывает в шаблон содержимого тоолько HTML файлы!
            fs.readFile( path.join(__dirname, "components", `${file}`),'utf-8', (err, componentsPage) => {
                templatePage = templatePage.replace(`{{${file.split(".")[0]}}}`, componentsPage)
                fs.writeFile(path.join(__dirname,'project-dist', "index.html"),templatePage, () => {} )
            })
            console.log(`Шаблон файла ${file} был добавлен в index.html`)
        }
    })
})


//=========================Копирование Assets
fs.readdir(path.join(__dirname, "assets"), (err, folders) => {
    for (let folder of folders ) {
        fs.mkdir(path.join(__dirname,'project-dist', 'assets', folder), (err) => {})
    }
}) //Создаем три папки в project-dist/assets/

fs.readdir(path.join(__dirname, "assets", 'fonts'), (err, fonts) => {
    for (let font of fonts ) {
        fs.copyFile(path.join(__dirname, 'assets','fonts', font), path.join(__dirname, 'project-dist', 'assets','fonts', font), (err) => {});
    }
}) //Добавляем в папку fonts шрифты

fs.readdir(path.join(__dirname, "assets", 'img'), (err, imgs) => {
    for (let img of imgs ) {
        fs.copyFile(path.join(__dirname, 'assets','img', img), path.join(__dirname, 'project-dist', 'assets','img', img), (err) => {});
    }
}) //Добавляем в папку img картинки

fs.readdir(path.join(__dirname, "assets", 'svg'), (err, svgs) => {
    for (let svg of svgs ) {
        fs.copyFile(path.join(__dirname, 'assets','svg', svg), path.join(__dirname, 'project-dist', 'assets','svg', svg), (err) => {});
    }
}) //Добавляем svg-файлы в папку svg 


//=========================Добавление стилей в style.css
fs.readdir(path.join(__dirname, "styles"), (err, files) => {
    for (let file of files ) {
        if (path.extname(file) == ".css") {
            const myReadStream = fs.createReadStream(path.join(__dirname, "styles", file), 'utf-8');
            myReadStream.on('data', (chunk) => {
                fs.appendFile(__dirname + '/project-dist/style.css',chunk.toString() + '\n',function () {})
                console.log(`Содержимое файла ${file} перезаписанно в файл style.css`)
            });
        }
    }
})
