var gulp = require('gulp');
var webpack = require('webpack');
var path = require('path');
var gutil = require('gulp-util');
var serve = require('browser-sync');
var webpackDevMiddelware = require('webpack-dev-middleware');
var webpachHotMiddelware = require('webpack-hot-middleware');
var historyApiFallback = require('connect-history-api-fallback');

var root = 'client';

// helper method for resolving paths
var resolveToApp = function(glob) {
  if(!glob) {
    return path.join(root, 'app', '');
  }

  return path.join(root, 'app', glob); // app/{glob}
};

var resolveToComponents = function(glob) {
  if(!glob) {
    return path.join(root, 'app/components', '');
  }
  return path.join(root, 'app/components', glob); // app/components/{glob}
};

// map of all paths
var paths = {
  js: resolveToComponents('**/*!(.spec.js).js'), // exclude spec files
  sass: resolveToApp('**/*.scss'), // stylesheets
  html: [
    resolveToApp('**/*.html'),
    path.join(root, 'index.html')
  ],
  entry: path.join(__dirname, root, 'app/app.js'),
  output: root
};

// use webpack.config.js to build modules
gulp.task('webpack', function(cb) {
  var config = require('./webpack.dist.config');
  config.entry.app = paths.entry;

  webpack(config, function(err, stats) {
    if(err)  {
      throw new gutil.PluginError("webpack", err);
    }

    gutil.log("[webpack]", stats.toString({
      chunks: false,
      errorDetails: true
    }));

    cb();
  });
});

gulp.task('serve', function() {
  var config = require('./webpack.dev.config');
  config.entry.app = [
    // this modules required to make HRM working
    // it responsible for all this webpack magic
    'webpack-hot-middleware/client?reload=true',
    // application entry point
    paths.entry
  ];

  var compiler = webpack(config);

  serve({
    port: process.env.PORT || 3000,
    open: false,
    server: {baseDir: root},
    middleware: [
      historyApiFallback(),
      webpackDevMiddelware(compiler, {
        stats: {
          chunks: false,
          modules: false
        },
        publicPath: config.output.publicPath
      }),
      webpachHotMiddelware(compiler)
    ]
  });
});

gulp.task('watch', ['serve']);

gulp.task('default', ['serve']);
