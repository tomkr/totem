//Functions that facilitate the basic rendering of posts.

const fs = require('fs');
const frontMatter = require('front-matter');
const Handlebars = require('handlebars');
const marked = require('marked');

//Splits the body and front-matter of a buffer of a post file.
exports.buildPost = (buffer) => {
  return frontMatter(buffer.toString());
}

//Configures handlebars for rendering the needed templates.
const setupHandlebars = (callback) => {
  fs.readFile('templates/header.hbs', 'utf-8', (err, header) => {
    fs.readFile('templates/footer.hbs', 'utf-8', (err, footer) => {
      Handlebars.registerPartial('header', header.toString());
      Handlebars.registerPartial('footer', footer.toString());
      callback()
    });
  });
}

//Takes attributes and body data and renders the post template.
exports.renderPost = (data, done) => {
  fs.readFile('templates/post.hbs', 'utf-8', (err, template) => {
    const templateData = { attributes: data.attributes, body: new Handlebars.SafeString(data.body) }
    setupHandlebars(() => {
      done(Handlebars.compile(template.toString())(templateData));
    });
  });
}

//Formats a body using markdown.
exports.formatPost = (body) => {
  return marked(body);
}
