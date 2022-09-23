const path = require('node:path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = ({ analyze }) => ({
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, '../src'),
        use: {
          loader: 'babel-loader',
          options: {
            envName: 'production',
            // Shouldn't be necessary with webpack cache, right?
            // Test performance impact
            cacheDirectory: '.cache/babel-loader',
            cacheCompression: false,
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCSSExtractPlugin({ filename: '[name].[contenthash].css' }),
    analyze && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[/\\]node_modules[/\\]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [`...`, new CSSMinimizerPlugin()],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },
})
