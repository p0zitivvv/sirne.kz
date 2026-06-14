const fs = require('fs');
const pdf = require('pdf-parse');

try {
    console.log("Reading file...");
    let dataBuffer = fs.readFileSync('C:\\Users\\kuany\\Desktop\\сайт меню\\Мәзір Сірне KZ.pdf');
    console.log("Parsing PDF...");
    pdf(dataBuffer).then(function (data) {
        fs.writeFileSync('menu-text.txt', data.text);
        console.log("SUCCESS");
    }).catch(function (error) {
        console.error("PDF_ERROR", error);
    });
} catch (e) {
    console.error("FILE_ERROR", e);
}
