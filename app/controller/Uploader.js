const sendToWormhole = require('stream-wormhole');
const Controller = require('egg').Controller;
class UploaderController extends Controller {
  async upload() {
    const { ctx, app } = this;
    const fieldSize = 100;
    const fileSize = 100;
    let err = false;
    const errorList = [];
    const parts = ctx.multipart({
      limits: {
        fieldNameSize: 100,
        fieldSize,
        fields: 10,
        fileSize,
        files: 10
      },
      /**
       * checkFile函数，自定义检查文件函数，file和field，都执行此函数
       *  file:
       *     boy.emit('file', fieldname, file, filename, encoding, contype);
       *     checkField(      fieldname, file, filename, encoding, mimetype)
       *  field :
       *     boy.emit('field', fieldname, buffer, false             , truncated   , encoding, contype);
       *     checkField(       name     , val   , fieldnameTruncated, valTruncated) 无encoding, contype
       * @param {string} fieldname  字段名称
       * @param {FileStream} file 文件流，
       * @param {string} filename 文件名称
       * @param {string} encoding encoding
       * @param {string} mimetype mimetype
       * @return {boolean} 返回是否错误
       */
      checkFile: (fieldname, file, filename, encoding, mimetype) => {
        console.log('field: ' + fieldname);
        console.log('filename: ' + filename);
        console.log('encoding: ' + encoding);
        console.log('encoding: ' + mimetype);
        file.on('limit', () => {
          errorList.push(`${fieldname}:上传文件(${filename})不能超过${fileSize}b`);
          console.log('上传文件不能超过100b');
          err = true;
        });
        return false;
      }
    });
    // const stream = await ctx.getFileStream();
    let part;
    const arr = [];
    // parts() return a promise
    while ((part = await parts()) != null) {
      if (part.length) {
        // 如果是数组的话是 filed
        console.log('field: ' + part[0]);
        console.log('value: ' + part[1]);
        console.log('valueTruncated: ' + part[2]);
        console.log('fieldnameTruncated: ' + part[3]);
      } else {
        if (!part.filename) {
          // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
          // 需要做出处理，例如给出错误提示消息
          return;
        }
        if (err) {
          await sendToWormhole(part);
          break;
        }
        // part 是上传的文件流
        console.log('field: ' + part.fieldname);
        console.log('filename: ' + part.filename);
        console.log('encoding: ' + part.encoding);
        console.log('mime: ' + part.mime);
        // 文件处理，上传到云存储等等
        // let result;
        arr.push(part.filename);
        // await sendToWormhole(part);
        try {
          // await sendToWormhole(part);
          await this.service.uploader.saveImgFile(app.config.static.dir + '/images/tmp/' + part.filename, part);
          // result = await ctx.oss.put('egg-multipart-test/' + part.filename, part);
        } catch (err) {
          // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
          await sendToWormhole(part);
          throw err;
        }
      // ctx.redirect('/');
      // ctx.body = ctx.helper.succeed({ data: 'ok' });
      // console.log(result);
      }
    }
    if (errorList.length) {
      ctx.body = ctx.helper.error({ data: errorList });
    } else {
      ctx.body = ctx.helper.succeed({ data: { filename: arr } });
    }
    console.log('and we are done parsing the form!');
  }
}
module.exports = UploaderController;
