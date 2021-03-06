
var gulp = require('gulp');

var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var RevAll = require('gulp-rev-all');

var imagemin = require('gulp-imagemin');
var del = require('del');
var awspublish = require('gulp-awspublish');
var AWS = require('aws-sdk');
var cloudfront = require("gulp-cloudfront");

var webserver = require('gulp-webserver');

gulp.task('clean', function (cb) {
  return del(['dist/', 'cdn/'], cb);
});

gulp.task('usemin', function() {
  return gulp.src('./*.html')
    .pipe(usemin({
      css: [ ],
      html: [ function () {return minifyHtml({ empty: true });} ],
      js: [ uglify ],
      inlinejs: [ uglify ],
      inlinecss: [ minifyCss, 'concat' ]
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('imgopt', function() {
  return gulp.src('assets/images/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest('dist/assets/images'));
});

var credentials = new AWS.SharedIniFileCredentials({profile: 'dev'});
AWS.config.credentials = credentials;
AWS.config.update({region: 'us-east-1'});

gulp.task('publish', ['usemin', 'imgopt'],function() {
  var aws = {
    params: {
      Bucket: 'portfolio.ryanfitz.co'
    },
    region: 'us-east-1',
    credentials: credentials,
    distributionId: 'EC8V2BS76CSTE'
  };

  var publisher = awspublish.create(aws);
  var headers = {'Cache-Control': 'max-age=315360000, no-transform, public'};

  // var revAll = new RevAll({
  //   dontRenameFile: [/\.html$/],
  //   dontUpdateReference: [/\.html$/]
  // });

  var revAll = new RevAll();
  return gulp.src('dist/**')
    .pipe(revAll.revision())
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter())
    .pipe(cloudfront(aws));
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true,
      fallback: 'index.html'
    }));
});

gulp.task('deploy', ['usemin', 'imgopt', 'publish'], function() {

});

gulp.task('default', function() {
});
