const downloadPage = require('./downloadPage.js');

downloadPage(process.argv[2], (error, data) => {
  if(error) console.error(error);
  console.log("-- Page Download DONE --");
  console.log(`Path: ${fileinfos.pathfile}`);
  console.log(`File Size: ${fileinfos.fileSizeInKB}`);
});
