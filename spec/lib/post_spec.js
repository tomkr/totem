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
    Post.renderPost(data, (rendered) => {
      expect(rendered).toContain('Title');
      expect(rendered).toContain('Hello world');
      done();
    });
  });

  it('leaves html in the body', (done) => {
    const data = { attributes: { title: 'Title' }, body: '<p>Hello world</p>' }
    Post.renderPost(data, (rendered) => {
      expect(rendered).toContain('<p>Hello world</p>');
      done();
    });
  });

  it('does not change data', (done) => {
    const data = { attributes: { title: 'Title' }, body: '<p>Hello world</p>' }
    Post.renderPost(data, (rendered) => {
      expect(data).toEqual({ attributes: { title: 'Title' }, body: '<p>Hello world</p>' });
      done();
    });
  });

  it('renders partials', (done) => {
    const data = { attributes: { title: 'Title' }, body: '<p>Hello world</p>' }
    Post.renderPost(data, (rendered) => {
      expect(rendered).toContain('<html>');
      expect(rendered).toContain('</html>');
      done();
    });
  });
});

describe('formatting the post', () => {
  it('returns the formatted post', () => {
    const body = '**bold**'
    expect(Post.formatPost(body)).toEqual('<p><strong>bold</strong></p>\n')
  })
})
