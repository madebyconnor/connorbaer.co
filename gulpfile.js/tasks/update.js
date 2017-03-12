// ==== UPDATE ==== //

const gulp    = require('gulp'),
      plugins = require('gulp-load-plugins')({ camelize: true }),
      config  = require('../../gulpconfig').update
;

// Used to get around Sass's inability to properly @import vanilla CSS; see: https://github.com/sass/sass/issues/556
gulp.task('update', () => {
  return gulp.src(config.styles.src)
    .pipe(plugins.changed(config.styles.dest))
    .pipe(plugins.rename(config.styles.rename))
    .pipe(gulp.dest(config.styles.dest));
});
