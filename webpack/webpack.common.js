const path = require('node:path')
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DotEnv = require('dotenv-webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = () => ({
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    plugins: [new TSConfigPathsPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Foundation',
      favicon: './src/assets/logo-icon.ico',
      meta: { viewport: 'width=device-width, initial-scale=1.0' },
      templateContent: `
        <!DOCTYPE html>
        <html>
          <body>
            <div id="root"></div>
          </body>
        </html>
        `,
    }),
    new DotEnv(),
    new ForkTsCheckerWebpackPlugin({
      // Don't show full screen overlay with errors in dev mode
      devServer: false,
      // Required for incremental type checking
      typescript: {
        build: true,
        mode: 'write-references',
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(?:png|jpe?g|svg|webm|mp4|woff2?)$/,
        type: 'asset',
      },
      {
        test: /\.(?:txt|md)/,
        type: 'asset/source',
      },
    ],
  },
  cache: {
    // Can also be configured for CI/CD if needed
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '../.cache/webpack'),
    buildDependencies: {
      config: [path.resolve(__dirname, '../webpack.config.js')],
    },
  },
  experiments: {
    topLevelAwait: true,
  },
})
