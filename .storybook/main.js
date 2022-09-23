const webpackConfig = require('../webpack.storybook.js')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
    disableTelemetry: true,
    options: {
      lazyCompilation: true,
    },
  },
  features: {
    // This is supposed to be a pretty cool feature but currently it makes the stories completely empty
    // May be there's something wrong with my config or it's just not ready yet, idk 🤷
    // storyStoreV7: true,
    babelModeV7: true,
  },
  typescript: {
    check: true,
  },
  // I would prefer to use the same react-refresh that is used for development
  // but for some reason storybook doesn't want to work with it
  reactOptions: {
    fastRefresh: true,
  },
  webpackFinal: async (config, { configType }) => webpackConfig(config, configType.toLowerCase()),
}
