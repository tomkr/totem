const fs = require('fs');
const frontMatter = require('front-matter');

//Splits the body and front-matter of a post file.
exports.buildPost = (path, callback) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) throw err;
    callback(frontMatter(data));
  });
}
