// ==== SCRIPTS ==== //

const gulp    = require('gulp'),
      plugins = require('gulp-load-plugins')({ camelize: true }),
      config  = require('../../gulpconfig').scripts
;


// Minify scripts in place.
gulp.task('scripts-combined', () => {
  return gulp.src(config.src.combined)
    .pipe(plugins.concat(config.combined))
    .pipe(plugins.babel({presets: [['es2015', { 'modules': false }]]}))
    .pipe(plugins.uglify(config.minify.uglify))
    .pipe(plugins.rename(config.minify.rename))
    .pipe(gulp.dest(config.dest));
});

// Copy third-party JavaScript to the public assets folder.
gulp.task('scripts-single', () => {
  const bundles = config.src.single;

  Object.keys(bundles).forEach(function(key) {
    return gulp.src(bundles[key])
      .pipe(plugins.concat(key))
      .pipe(plugins.changed(config.dest))
      .pipe(plugins.babel({presets: ['es2015']}))
      .pipe(plugins.uglify(config.minify.uglify))
      .pipe(plugins.rename(config.minify.rename))
      .pipe(gulp.dest(config.dest));
  });
});

// Copy third-party JavaScript to the public assets folder.
gulp.task('scripts-inline', () => {
  return gulp.src(config.src.inline)
    .pipe(plugins.changed(config.dest))
    .pipe(plugins.uglify(config.minify.uglify))
    .pipe(plugins.rename(config.minify.rename))
    .pipe(gulp.dest(config.destInline));
});

// Master script task; lint -> bundle -> minify.
gulp.task('scripts', ['scripts-combined', 'scripts-single', 'scripts-inline']);
