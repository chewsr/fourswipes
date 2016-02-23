'use strict'

let del = require('del')
let babelTest = require('babel-core/register')
let gulp = require('gulp')
let plug = require('gulp-load-plugins')()
let connect = require('gulp-connect')
let cors = require('cors')

const config = {
  src: 'src',
  public: 'public',
  dist: 'dist',
  es6: ['src/*.js', 'src/{components,containers}/**'],
  es5: ['src/jspm_packages/**/*', 'src/config.js'],
  assets: 'src/**/*.{html,png,jpg,jpeg,gif}',
  sass: ['src/sass/**/*.sass'],
  test: 'test/**/*.js',
  index: 'public/swipe.js',
  bundle: `four-swipe-${process.env.VERSION || '0.0.0'}.js`
}

gulp.task('connect', () => {
  connect.server({
    root: config.public,
    middleware: function () {
      return [cors()]
    },
    port: 8000,
    livereload: true
  })
})

gulp.task('default', ['dev'])

gulp.task('dev', ['transpile', 'copy', 'watch', 'serve'])

gulp.task('bundle', ['transpile', 'copy'], () => {
  return gulp.src(config.index)
    .pipe(plug.jspm({selfExecutingBundle: true, minify: true}))
    .pipe(plug.rename(config.bundle))
    .pipe(gulp.dest(config.dist))
})

gulp.task('build-dist', () => {

  gulp.src('src/run.html')
  .pipe(gulp.dest(config.dist))

  gulp.src('public/style.css')
  .pipe(gulp.dest(config.dist))

  gulp.src('src/assets/*.jpg')
  .pipe(gulp.dest(config.dist + '/assets'))
})

gulp.task('sass', function () {
  return gulp.src(config.sass)
    .pipe(plug.sass())
    .pipe(gulp.dest(config.public))
})

gulp.task('transpile', () => {
  return gulp.src(config.es6)
    .pipe(plug.babel())
    .pipe(gulp.dest(config.public))
})

gulp.task('copy', () => {
  return gulp
    .src([config.assets].concat(config.es6), {base: config.src})
    .pipe(gulp.dest(config.public))
})

gulp.task('watch', () => {
  gulp.watch(config.es6, ['transpile'])
  gulp.watch(config.assets, ['copy'])
  gulp.watch(config.sass, ['sass'])
})

gulp.task('serve', ['transpile', 'copy'], () => {
  gulp.src(config.public)
    .pipe(plug.webserver({livereload: true, open: true}))
})

gulp.task('test', ['lint', 'mocha'])

gulp.task('lint', () => {
  return gulp.src(['*.js', config.es6, config.test])
    .pipe(plug.eslint({env: {es6: true}}))
    .pipe(plug.eslint.format())
    .pipe(plug.eslint.failAfterError())
})

gulp.task('mocha', () => {
  return gulp.src(config.test, {read: false})
    .pipe(plug.mocha({compilers: {js: babelTest}}))
})

gulp.task('clean', () => {
  return del([
    config.dist,
    `${config.public}/**/*`,
    `!${config.public}/config.js`,
    `!${config.public}/jspm_packages`,
    `!${config.public}/jspm_packages/**/*`
  ])
})
