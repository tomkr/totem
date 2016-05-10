const frontMatter = require('front-matter');

//Splits the body and front-matter of a buffer of a post file.
exports.buildPost = (buffer) => {
  return frontMatter(buffer.toString());
}
