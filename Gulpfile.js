var gulp = require('gulp');
var handlebars = require('handlebars');
var gulpHandlebars = require('gulp-handlebars-html')(handlebars);
var rename = require('gulp-rename');
const post = require('./tasks/post.js');

// Builds the site into the `build` folder.
gulp.task('build', function() {
  gulp.src('templates/*.hbs')
    .pipe(gulpHandlebars({}, {}))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest('build'));
});

gulp.task('buildPosts', () => {
  gulp.src('posts/*.md')
    .pipe(post.build)
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest('build'));
});

// Puts a draft in the posts folder.
gulp.task('draft', function(title) {
});

// Puts a post in the post folder, or removes draft status from a post.
gulp.task('post', function(title) {
});

// Serves the build folder.
gulp.task('server', function(title) {
});
