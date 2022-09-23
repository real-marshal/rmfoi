const path = require('node:path')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

const common = require('./webpack/webpack.common.js')()

// Looks a bit convoluted but I think that's fine for now
module.exports = (storybookConfig, mode) => ({
  ...storybookConfig,
  resolve: {
    ...storybookConfig.resolve,
    plugins: common.resolve.plugins,
  },
  plugins: [
    ...storybookConfig.plugins,
    mode === 'production' && new MiniCSSExtractPlugin({ filename: '[name].[contenthash].css' }),
  ].filter(Boolean),
  module: {
    rules: [
      ...common.module.rules,
      {
        test: /\.[jt]sx?$/,
        include: [path.resolve(__dirname, './src'), path.resolve(__dirname, './.storybook')],
        use: {
          loader: 'babel-loader',
          options: {
            envName: mode === 'development' ? 'storybookDev' : 'production',
            // Shouldn't be necessary with webpack cache, right?
            // Test performance impact
            cacheDirectory: '.cache/storybook/babel-loader',
            cacheCompression: false,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          mode === 'development' ? 'style-loader' : MiniCSSExtractPlugin.loader,
          'css-loader',
        ].filter(Boolean),
      },
    ],
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, './.cache/storybook/webpack'),
    buildDependencies: {
      config: [__filename],
    },
  },
})
