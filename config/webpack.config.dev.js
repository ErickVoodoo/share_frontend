const path = require('path');
const cssnano = require('cssnano');
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies, max-len
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies, max-len
const WatchMissingNodeModulesPlugin = require('../scripts/utils/WatchMissingNodeModulesPlugin');
const paths = require('./paths');
const variables = require('./variables.dev');
const env = require('./env')(variables);

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = {
  devtool: 'eval',
  // Add context
  context: paths.appSrc,
  entry: [
    require.resolve('react-hot-loader/patch'),
    // Include WebpackDevServer client. It connects to WebpackDevServer via
    // sockets and waits for recompile notifications. When WebpackDevServer
    // recompiles, it sends a message to the client by socket. If only CSS
    // was changed, the app reload just the CSS. Otherwise, it will refresh.
    // The "?/" bit at the end tells the client to look for the socket at
    // the root path, i.e. /sockjs-node/. Otherwise visiting a client-side
    // route like /todos/42 would make it wrongly request /todos/42/sockjs-node.
    // The socket server is a part of WebpackDevServer which we are using.
    // The /sockjs-node/ path I'm referring to is hardcoded in WebpackDevServer.
    `${require.resolve('webpack-dev-server/client')}?/`,
    // Include Webpack hot module replacement runtime. Webpack is pretty
    // low-level so we need to put all the pieces together. The runtime listens
    // to the events received by the client above, and applies updates (such as
    // new CSS) to the running application.
    require.resolve('webpack/hot/dev-server'),
    // We ship a few polyfills by default.
    require.resolve('./polyfills'),
    // Finally, this is your app's code:
    path.join(paths.appSrc, 'index'),
  ],
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: paths.appBuild,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: '[name].js?hash=[hash:8]',
    chunkFilename: '[name].chunk.js?hash=[hash:8]',
    // Hot-reload
    hotUpdateMainFilename: 'update/[hash]/update.json',
    hotUpdateChunkFilename: 'update/[hash]/[id].update.js',
    // In development, we always serve from the root. This makes config easier.
    publicPath: 'http://0.0.0.0:3000/',
  },
  resolve: {
    modules: [paths.ownNodeModules, paths.appSrc],
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebookincubator/create-react-app/issues/290
    extensions: ['.js', '.json', '.jsx'],
  },

  module: {
    rules: [
      // First, run the linter.
      // {
      //   test: /\.(js|jsx)$/,
      //   enforce: 'pre',
      //   loader: 'eslint-loader',
      //   include: paths.appSrc,
      // },
      // Process JS with Babel.
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: 'babel-loader',
        options: require('./babel.dev'), // eslint-disable-line global-require
      },
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // In production, we use a plugin to extract that CSS to a file, but
      // in development "style" loader enables hot editing of CSS.
      {
        test: /\.css$/,
        include: paths.appSrc,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              sourceMap: true,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        include: paths.ownNodeModules,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        include: paths.appSrc,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              sourceMap: true,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.po$/,
        use: [
          'json-loader',
          {
            loader: 'po-loader',
            options: {
              format: 'jed1.x',
            },
          },
        ],
        include: paths.appI18n,
      },
      // "file" loader makes sure those assets get served by WebpackDevServer.
      // When you `import` an asset, you get its (virtual) filename.
      // In production, they would get copied to the `build` folder.
      {
        test: /\.(ico|jpe?g|png|gif|webp|svg)(\?.*)?$/,
        exclude: /\/(favicon32.ico|icon.png)?$/,
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.woff$/,
        loader: 'url-loader',
        options: {
          limit: 65000,
          mimetype: 'application/font-woff',
          name: 'public/fonts/[name].[ext]',
        },
      },
      {
        test: /\.woff2$/,
        loader: 'url-loader',
        options: {
          limit: 65000,
          mimetype: 'application/font-woff2',
          name: 'public/fonts/[name].[ext]',
        },
      },
      {
        test: /\.[ot]tf$/,
        loader: 'url-loader',
        options: {
          limit: 65000,
          mimetype: 'application/octet-stream',
          name: 'public/fonts/[name].[ext]',
        },
      },
      {
        test: /\.eot$/,
        loader: 'url-loader',
        options: {
          limit: 65000,
          mimetype: 'application/vnd.ms-fontobject',
          name: 'public/fonts/[name].[ext]',
        },
      },
      // "url" loader works just like "file" loader but it also embeds
      // assets smaller than specified size as data URLs to avoid requests.
      {
        test: /\.(wav|mp3|mp4|webm)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.LoaderOptionsPlugin({
      // test: /\.xxx$/, // may apply this only for some modules
      options: {
        postcss: [
          cssnano({
            autoprefixer: {
              add: true,
              remove: true,
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
              ],
            },
            discardComments: {
              removeAll: true,
            },
            discardUnused: {
              keyframes: false,
            },
            mergeIdents: false,
            reduceIdents: {
              keyframes: false,
            },
            safe: true,
            sourcemap: true,
          }),
        ],
        eslint: {
          configFile: path.join(__dirname, 'eslint.js'),
          useEslintrc: false,
        },
        sassLoader: {
          includePaths: [path.resolve(__dirname, 'src', 'scss', '../')],
        },
        context: '/',
      },
    }),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        collapseWhitespace: true,
      },
    }),
    new webpack.ContextReplacementPlugin(/^\.\/locale$/, context => {
      if (!/\/moment\//.test(context.context)) {
        return;
      }
      // `context` needs to be modified in place
      Object.assign(context, {
        // Include only necessary languages
        regExp: /^\.\/(ru)/,
        // point to the locale data folder relative to moment's src/lib/locale
        request: '../../locale',
      });
    }),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'development') { ... }. See `env.js`.
    new webpack.DefinePlugin(env),
    // Enables Hot Module Replacement
    // https://webpack.github.io/docs/list-of-plugins.html#hotmodulereplacementplugin
    new webpack.HotModuleReplacementPlugin(),
    // Moves files
    // new TransferWebpackPlugin([{ from: 'public', to: 'public' }], paths.appSrc),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebookincubator/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    // new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 5024000 })
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
