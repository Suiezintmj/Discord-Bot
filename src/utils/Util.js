
const renderEmoji = require("./plugins/renderEmoji.js");


module.exports = class Util {

  static renderEmoji(ctx, msg, x, y) {
    return renderEmoji(ctx, msg, x, y);
  }

};
