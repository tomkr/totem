//Gulp task for building a post.

const through = require('through2');
const Post = require('../lib/post.js');

//Builds a single post
exports.build = () => {
  return through.obj(function(file, encoding, done) {
    const data = Post.buildPost(file.contents.toString());
    data.body = Post.formatPost(data.body);
    Post.renderPost(data, (template) => {
      file.contents = Buffer.from(template);
      this.push(file);
      return done();
    });
  });
}
