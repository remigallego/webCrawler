const http = require('http');
const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');

module.exports = function downloadPage(url, callback)
{
  let getPage = (urlP, writePage) => {
    http.get(urlP, (res) => {
      let buffer = '';
      res.on("data", (chunk) => {
          buffer += chunk;
        });
      res.on("end", () => {
        writePage(buffer);
        });
    })
    .on('error', (error) => {
    return callback("-- HTML GET Error: " + error.message);
    });
  };

  getPage(url, function writePage(data) {
    let filesinfos = {};
    if(data === null)
    {return callback("-- Error downloading the page");}

    let folder = uuidv1();
    fs.mkdirSync(path.join(__dirname, 'Downloads', folder));
    fs.writeFileSync(path.join(__dirname, 'Downloads', folder, folder + '.html'), data);
    let stats = fs.statSync(path.join(__dirname, 'Downloads', folder, folder + '.html'));
    let fileSizeInKB = parseFloat(stats.size) / 1000.0;
    let pathfile = path.join(__dirname, 'Downloads', folder, folder + '.html');
    fileinfos = {pathfile: pathfile, fileSizeInKB: fileSizeInKB};
    return callback(null, fileinfos);
  });
}

function getFilesizeInBytes(filename) {
    const stats = fs.statSync(filename);
    const fileSizeInBytes = stats.size;
    return fileSizeInBytes;
}
