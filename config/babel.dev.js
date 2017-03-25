module.exports = {
  babelrc: false,
  cacheDirectory: true,
  presets: [
    // Latest stable ECMAScript features
    [require.resolve('babel-preset-latest'), {
      es2015: {
        modules: false,
      },
    }],
    // JSX, Flow
    require.resolve('babel-preset-react'),
  ],
  plugins: [
    // Enable hot-reloading
    require.resolve('react-hot-loader/babel'),
    // class { handleClick = () => { } }
    require.resolve('babel-plugin-transform-class-properties'),
    // { ...todo, completed: true }
    [require.resolve('babel-plugin-transform-object-rest-spread'), {
      useBuiltIns: true,
    }],
    // export * as ns from 'mod';
    require.resolve('babel-plugin-transform-export-extensions'),
    // obj::func
    require.resolve('babel-plugin-transform-function-bind'),
    // Adds component stack to warning messages
    require.resolve('babel-plugin-transform-react-jsx-source'),
    // Adds __self attribute to JSX which React will use for some warnings
    require.resolve('babel-plugin-transform-react-jsx-self'),
    // function* () { yield 42; yield 43; }
    [require.resolve('babel-plugin-transform-regenerator'), {
      // Async functions are converted to generators by babel-preset-latest
      async: false,
    }],
    // Polyfills the runtime needed for async/await and generators
    [require.resolve('babel-plugin-transform-runtime'), {
      helpers: false,
      polyfill: false,
      regenerator: true,
    }],
  ],
};
