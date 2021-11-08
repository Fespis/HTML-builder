const fs = require('fs')


fs.writeFile(__dirname + '/yourText.txt', ' ', function () {
})
process.stdout.write('Привет) Введите сообщение:')


process.stdin.on ('data', function (data) {
    let text = data.toString()

    if (text.toLowerCase().trim() == 'exit') {
        console.log("Выхожу из программы!")
        process.exit()
    } else {
        fs.writeFile(__dirname + '/yourText.txt',text,function () {
            console.log("Операция завершена!)")
            process.stdout.write('Введите ваше сообщение:')
        })
    }
})

//Далее идет код для выхода из программы при помощи CTRL + C
//На Windows 10 все работает
//Но на некоторых сайтах говорят, что на других системах могут быть проблемы
//Если это так, то просьба перед выставление оценки написать в Дискорд (@Fespis)

process.on("SIGINT", function () {
  console.log("\nУже уходите(")
  process.exit();
});
process.on('exit', function () { process.stdout.write('Пока!') });