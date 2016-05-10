const fs = require('fs');
const gutil = require('gulp-util');
const path = require('path');
const post = require('../../tasks/post.js');

describe('building a post from a vinyl stream', () => {
  const filePath = path.join('spec', 'fixtures', 'post.md');
  const file = new gutil.File({
    path: filePath,
    cwd: path.join('spec', 'fixtures'),
    base: path.dirname(filePath),
    contents: fs.readFileSync(filePath)
  });
  stream = post.build;
  stream.on('data', (file) => {
    expect(file.contents.toString()).toContain('<h2>Hello world</h2>');
  });
  stream.write(file);
  stream.end();
});
