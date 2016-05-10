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
  it('returns the rendered string', (done) => {
    const data = { attributes: { title: 'Title' }, body: 'Hello world' }
    expect(Post.renderPost(data, (rendered) => {
      expect(rendered).toContain('<h2>Title</h2>');
      expect(rendered).toContain('<article>Hello world');
      done();
    }));
  });

  it('leaves html in the body', (done) => {
    const data = { attributes: { title: 'Title' }, body: '<p>Hello world</p>' }
    expect(Post.renderPost(data, (rendered) => {
      expect(rendered).toContain('<article><p>Hello world');
      done();
    }));
  });

  it('does not change data', (done) => {
    const data = { attributes: { title: 'Title' }, body: '<p>Hello world</p>' }
    expect(Post.renderPost(data, (rendered) => {
      expect(data).toEqual({ attributes: { title: 'Title' }, body: '<p>Hello world</p>' });
      done();
    }));
  });
});

describe('formatting the post', () => {
  it('returns the formatted post', () => {
    const body = '**bold**'
    expect(Post.formatPost(body)).toEqual('<p><strong>bold</strong></p>\n')
  })
})
