// ==== STYLES ==== //

const gulp    = require('gulp'),
      critical = require('critical'),
      plugins = require('gulp-load-plugins')({ camelize: true }),
      config  = require('../../gulpconfig').styles
;


// Build stylesheets from source Sass files, post-process, write source maps (for debugging) with libsass, and version the file.
gulp.task('styles', () => {
  return gulp.src(config.src)
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init()) // Note that sourcemaps need to be initialized with libsass
    .pipe(plugins.sass(config.libsass))
    .pipe(plugins.cssnano(config.minify.cssnano))
    .pipe(plugins.rename(config.minify.rename))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest));
});


// Inject accelerated mobile pages CSS into the HTML head.
gulp.task('styles-amp', () => {
  return gulp.src(config.amp.src)
    .pipe(gulp.dest(config.amp.dest));
});


// Process data in an array synchronously, moving onto the n+1 item only after the nth item callback.
function doSynchronousLoop(data, processor, done) {
  if (data.length > 0) {
    const loop = (data, i, processor, done) => {
      processor(data[i], i, () => {
        if (++i < data.length) {
          loop(data, i, processor, done);
        } else {
          done();
        }
      });
    };

    loop(data, 0, processor, done);
  } else {
    done();
  }
}

// Process the critical path CSS one at a time
function criticalCSS(element, i, callback) {
  console.log('Generating critical CSS for ' + config.critical.src + element.url);
  critical.generate({
    src: config.critical.src + element.url,
    dest: config.critical.dest + element.template + '.min.css',
    base: config.critical.base,
    css: [
      config.critical.css,
    ],
    minify: true,
    dimensions: [{
      height: config.critical.small.height,
      width: config.critical.small.width,
    }, {
      height: config.critical.large.height,
      width: config.critical.large.width,
    },],
  }, (err, output) => {
    console.log(err);
    callback();
  });
}

// Generate critical css.
gulp.task('styles-critical', (callback) => {
  doSynchronousLoop(config.critical.files, criticalCSS, () => {
    // All done.
    callback();
  });
});
