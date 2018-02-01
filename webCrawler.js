const http = require('http');
const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');

const downloadPage = (url) =>
{
  let getPage = function (urlP, writePage) {
    http.get(urlP, function (res) {
      let buffer = '';
      res.on("data", function (chunk) {
          buffer += chunk;
        });
      res.on("end", function () {
        writePage(buffer);
        });
    })
    .on('error', function (error) {
    console.error("-- HTML GET Error: " + error.message);
    });
  };

  getPage(url, function writePage(data) {
    data === null ? console.error("-- Error downloading the page") : null;

    let folder = uuidv1();
    //  folder = '/Downloads/' + folder;
    fs.mkdirSync(path.join(__dirname, 'Downloads', folder));
    fs.writeFileSync(path.join(__dirname, 'Downloads', folder, 'url.txt'), url);
    fs.writeFileSync(path.join(__dirname, 'Downloads', folder, folder + '.html'), data);
    console.log('-- Download is done in the folder: ', folder);
  });
}

downloadPage(process.argv[2]);
