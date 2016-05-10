const fs = require('fs');
const frontMatter = require('front-matter');
const Handlebars = require('handlebars');

//Splits the body and front-matter of a buffer of a post file.
exports.buildPost = (buffer) => {
  return frontMatter(buffer.toString());
}

//Takes attributes and body data and renders the post template.
exports.renderPost = (data, done) => {
  fs.readFile('templates/post.hbs', 'utf-8', (err, template) => {
    done(Handlebars.compile(template.toString())(data));
  });
}
