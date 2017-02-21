// ==== GULP CONFIGURATION ==== //

// 1. Variables
// 2. BrowserSync
// 3. Watch
// 4. Update
// 5. Clean
// 6. Styles
// 7. Scripts
// 8. Icons
// 9. Revisions
// 10. AMP
// 11. Service Worker


// 1. Variables //

const pkg   = require('./package.json'), // Allows access to the project metadata from the package.json file.
  project = pkg.name, // The name of the project, pulled from the package.json.
  src     = 'source/', // The raw material of the theme: custom scripts, SCSS source files, images, etc.; do not delete this folder!
  dist    = 'web/', // The webroot directory that will be accessible on your server.
  assets  = 'assets/', // A folder for your assets in the source and/or distribution directory.
  tmplts  = 'templates/', // The CraftCMS template folder.
  bower   = 'bower_components/', // Bower packages.
  modules = 'node_modules/' // NPM packages.
;

module.exports = {


  // 2. BrowserSync

  browsersync: {
    files: [dist + '**/*', tmplts + '**/*'],
    port: 6000, // Port number for the live version of the site.
    proxy: 'http://local.' + project + '/', // We need to use a proxy instead of the built-in server because WordPress has to do some server-side rendering for the theme to work.
    notify: false, // In-line notifications (the blocks of text saying whether you are connected to the BrowserSync server or not)
    ui: false, // Set to false if you don't need the browsersync UI
    open: false, // Set to false if you don't like the browser window opening automatically
    reloadDelay: 1000, // Time, in milliseconds, to wait before reloading/injecting
    watchOptions: {
      debounceDelay: 4000, // This introduces a small delay when watching for file change events to avoid triggering too many reloads
    },
  },


  // 3. Watch //

  watch: {
    styles:  [src + 'css/**/*.scss'],
    scripts: src + 'js/*.js',
  },


  // 4. Update  //

  update: {
    // Copies dependencies from package managers to `_scss` and renames them to allow for them to be imported as a Sass file.
    styles: {
      src: [
        modules + 'normalize.css/normalize.css',
        modules + 'open-color/open-color.scss',
        modules + 'choices.js/assets/styles/scss/choices.scss',
      ],
      rename: {
        prefix: '_',
        extname: '.scss',
      },
      dest: src + 'css/dependencies/',
    },
  },


  // 5. Clean //

  clean: {
    tidy: [dist + '**/.DS_Store', dist + assets + 'revisions.json'], // A glob pattern matching junk files to clean out of `build`; feel free to add to this array.
    css: [dist + assets + 'css/'], // Clean this out before creating a new distribution copy.
    js: [dist + assets + 'js/'], // Clean this out before creating a new distribution copy.
  },


  // 6. Styles //

  styles: {
    src:  src + '**/**/*.scss',
    dest: dist + assets,
    cssnano: {
      autoprefixer: {
        add: true,
        browsers: ['> 3%', 'last 2 versions'], // This tool is magic and you should use it in all your projects :)
      },
    },
    libsass: { // Requires the libsass implementation of Sass (included in this package)
      includePaths: [bower, modules, src + 'css/'], // Adds Bower and npm directories to the load path so you can @import directly
      precision: 6,
      onError: function (err) {
        return console.log(err);
      },
    },
  },


  // 7. Scripts //

  scripts: {
    src: {
      combined: [
        modules + 'lazysizes/lazysizes.js',
        modules + 'Right-Height/dist/js/right-height.js',
        modules + 'headroom.js/dist/headroom.js',
      ],
      single: [
        modules + 'prismjs/prism.js',
        modules + 'rellax/rellax.js',
      ],
    },
    minify: {
      uglify: {}, // Default options.
      rename: {
        extname: '.min.js',
      },
    },
    dest: dist + assets + 'js/',
  },


  // 8. Icons //

  icons: {
    src: src + 'favicons/*(*.png|*.jpg|*.jpeg)',
    favicons: {
      appName: 'Connor Bär',
      appDescription: pkg.description,
      developerName: pkg.author,
      background: '#ffffff',
      theme_color: '#000000',
      path: '/favicons/',
      url: pkg.homepage,
      display: 'standalone',
      orientation: 'portrait',
      start_url: '/?utm_source=web_app_manifest',
      version: pkg.version,
      logging: false,
      online: false,
      replace: true,
      html: tmplts + '_includes/icons.html',
      pipeHTML: true,
      icons: {
        coast: { offset: 15 }, // Create Opera Coast icon with offset 15%. `boolean` or `{ offset: offsetInPercentage }`
        yandex: false,         // Create Yandex browser icon. `boolean`
      },
    },
    destHtml: '',
    dest: dist + 'favicons/',
  },


  // 9. Revisions //

  revisions: {
    css: dist + assets + '**/*.css',
    js: dist + assets + '**/*.js',
    dest: dist + assets,
    manifest: 'revisions.json',
    options: {
      base: dist + assets,
      merge: true,
    },
  },


  // 10. AMP //

  amp: {
    src:     tmplts + '_amp/base-unstyled.html',
    dest:    tmplts + '_amp/',
    css: {
      src:  dist + assets + 'css/styles.css',
      dest: dist + assets + 'css/',
    },
  },


  // 11. Service Worker //

  serviceWorker: {
    root:    dist,
    src:     assets + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}',
    name:    'service-worker.js',
    config: {
      cacheId: pkg.name,
      /*
      dynamicUrlToDependencies: {
        'dynamic/page1': [
          path.join(rootDir, 'views', 'layout.jade'),
          path.join(rootDir, 'views', 'page1.jade')
        ],
        'dynamic/page2': [
          path.join(rootDir, 'views', 'layout.jade'),
          path.join(rootDir, 'views', 'page2.jade')
        ]
      },
      */
      runtimeCaching: [{
        // See https://github.com/GoogleChrome/sw-toolbox#methods
        urlPattern: /runtime-caching/,
        handler: 'cacheFirst',
        // See https://github.com/GoogleChrome/sw-toolbox#options
        options: {
          cache: {
            maxEntries: 1,
            name: 'runtime-cache'
          }
        }
      }],
      staticFileGlobs: [
        dist + assets + '/css/**.css',
        dist + assets + '/js/**.js'
      ],
      stripPrefix: dist,
      // verbose defaults to false, but for the purposes of this demo, log more.
      verbose: true
    },
  },
};
