const fs = require('fs');
const gutil = require('gulp-util');
const path = require('path');
const post = require('../../tasks/post.js');

describe('building a post from a vinyl stream', () => {
  it('creates the new file', (done)=> {
    const filePath = path.join('spec', 'fixtures', 'post.md');
    const file = new gutil.File({
      path: filePath,
      cwd: path.join('spec', 'fixtures'),
      base: path.dirname(filePath),
      contents: fs.readFileSync(filePath)
    });
    stream = post.build();
    stream.once('data', (file) => {
      expect(file.contents.toString()).toContain('Hello world');
    });
    stream.once('end', done);
    stream.write(file);
    stream.end();
  });
});
