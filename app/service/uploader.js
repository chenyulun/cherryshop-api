const Promise = require('bluebird');
const fs = require('fs');
const Service = require('egg').Service;
class Uploader extends Service {
  async saveImgFile(savePath, stream) {
    const out = fs.createWriteStream(savePath);
    return (new Promise((resolve, reject) => {
      try {
        stream.pipe(out);
        stream.on('end', function() {
          resolve();
        });
      } catch (err) {
        reject(err);
      }
    }));
  }
}
module.exports = Uploader;
