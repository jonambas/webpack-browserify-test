var gulp            = require('gulp'),
    uglify          = require('gulp-uglify'),
    browserify      = require('browserify'),
    source          = require('vinyl-source-stream'),
    buffer          = require('vinyl-buffer'),
    gutil           = require('gulp-util'),
    webpack         = require('webpack'),
    rename          = require('gulp-rename');

var javascriptTask = function (callback) {
  webpack({
    // context: "./src/assets/js", process.env.PWD
    context: process.env.PWD,
    entry: "./src/assets/js/entry",
    output: {
        path: "./dist/assets/js",
        filename: "bundle.js"
    },
    module: {
      loaders: [
          { test: /\.js$/, loader: "uglify" }
      ]  
    },
    'uglify-loader': {
        mangle: false
    }
  }, function(err, stats) {
      if(err) throw new gutil.PluginError("webpack", err);
      gutil.log("[Webpack]", stats.toString({
          // output options
      }));

      callback();

      gulp.src('./dist/assets/js/bundle.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min' }))
        .pipe(gulp.dest('./dist/assets/js/'));
  });
};

/*var javascriptTask = function () {
  var b = browserify({
    entries: './src/assets/js/entry.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .on('error', gutil.log)
    .pipe(gulp.dest('./dist/assets/js/'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min' }))
    .pipe(gulp.dest('./dist/assets/js/'));
};*/

gulp.task('javascript', javascriptTask);
module.exports = javascriptTask;