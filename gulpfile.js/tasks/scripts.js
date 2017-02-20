// ==== SCRIPTS ==== //

const gulp    = require('gulp'),
      plugins = require('gulp-load-plugins')({ camelize: true }),
      config  = require('../../gulpconfig').scripts
;


// Copy third-party JavaScript to the public assets folder.
gulp.task('scripts-single', () => {
  return gulp.src(config.src.single)
    .pipe(plugins.changed(config.dest))
    .pipe(plugins.uglify(config.minify.uglify))
    .pipe(plugins.rename(config.minify.rename))
    .pipe(gulp.dest(config.dest));
});

// Minify scripts in place.
gulp.task('scripts-combined', () => {
  return gulp.src(config.src.combined)
    .pipe(plugins.concat('scripts.js'))
    .pipe(plugins.uglify(config.minify.uglify))
    .pipe(plugins.rename(config.minify.rename))
    .pipe(gulp.dest(config.dest));
});

// Master script task; lint -> bundle -> minify.
gulp.task('scripts', ['scripts-single', 'scripts-combined']);
