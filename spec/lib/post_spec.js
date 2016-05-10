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

describe('rendering a post', () => {
  const data = { attributes: { title: 'Title' }, body: 'Hello world' }

  it('returns the rendered string', (done) => {
    expect(Post.renderPost(data, (rendered) => {
      expect(rendered).toContain('<h2>Title</h2>');
      expect(rendered).toContain('<article>Hello world');
      done();
    }));
  });
});
