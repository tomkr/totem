var gulp = require('gulp');
var handlebars = require('handlebars');
var gulpHandlebars = require('gulp-handlebars-html')(handlebars);
var rename = require('gulp-rename');
const livereload = require('gulp-livereload');
const path = require('path');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const post = require('./tasks/post.js');

// Builds the site into the `build` folder.
gulp.task('build', function() {
  gulp.src('templates/*.hbs')
    .pipe(gulpHandlebars({}, {}))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest('build'));
});

//Build all the post pages.
gulp.task('buildPosts', () => {
  gulp.src('posts/*.md')
    .pipe(post.build())
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest(path.join('build', 'dev')))
    .pipe(livereload());
});

gulp.task('sass', () => {
  return gulp.src('src/static/stylesheets/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.join('build', 'dev', 'assets')))
    .pipe(livereload());
});

// Puts a draft in the posts folder.
gulp.task('draft', function(title) {
});

// Puts a post in the post folder, or removes draft status from a post.
gulp.task('post', function(title) {
});

// Serves the build folder.
gulp.task('server', function(title) {
  livereload.listen();
  gulp.watch('src/static/stylesheets/**/*.scss', ['sass']);
  gulp.watch('templates/**/*.hbs', ['buildPosts']);
  connect.server({
    root: 'build/dev'
  });
});
