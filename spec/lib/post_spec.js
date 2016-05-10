const fs = require('fs');
const Post = require('../../lib/post.js');

describe('building a post', () => {
  const file = fs.readFileSync('spec/fixtures/post.md');
  const post = Post.buildPost(file);

  it('returns the body of the post', () => {
    expect(post.body).toContain('Hello world');
  });

  it('returns the front-matter of the post', () => {
    expect(post.attributes.title).toEqual('Hello world');
  });
});
