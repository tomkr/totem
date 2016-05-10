var Post = require('../../lib/post.js');

describe('building a post', function() {
  it('returns the body of the post', function(done) {
    var post = Post.buildPost('spec/fixtures/post.md', (post) => {
      expect(post.body).toContain('Hello world');
      done()
    });
  });

  it('returns the front-matter of the post', function(done) {
    var post = Post.buildPost('spec/fixtures/post.md', (post) => {
      expect(post.attributes.title).toEqual('Hello world');
      done()
    });
  });
});
