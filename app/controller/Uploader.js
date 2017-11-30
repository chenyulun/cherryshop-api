const sendToWormhole = require('stream-wormhole');
const Controller = require('egg').Controller;
class UploaderController extends Controller {
  async upload() {
    const { ctx, app } = this;
    const parts = ctx.multipart();
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
        // part 是上传的文件流
        console.log('field: ' + part.fieldname);
        console.log('filename: ' + part.filename);
        console.log('encoding: ' + part.encoding);
        console.log('mime: ' + part.mime);
        // 文件处理，上传到云存储等等
        // let result;
        // arr.push(part.filename);
        // await sendToWormhole(part);
        try {
          // await sendToWormhole(part);
          await this.service.uploader.saveImgFile(app.config.static.dir + '/images/tmp/' + part.filename);
          // result = await ctx.oss.put('egg-multipart-test/' + part.filename, part);
        } catch (err) {
          // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
          await sendToWormhole(part);
          throw err;
        }
        ctx.body = ctx.helper.succeed({ data: { filename: arr } });
        // ctx.redirect('/');
        // ctx.body = ctx.helper.succeed({ data: 'ok' });
        // console.log(result);
      }
    }
    console.log('and we are done parsing the form!');
  }
}
module.exports = UploaderController;
