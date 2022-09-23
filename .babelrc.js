module.exports = (api) => ({
  presets: [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        useBuiltIns: 'usage',
        corejs: '3.25.0',
        debug: api.env('development'),
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        importSource: '@emotion/react',
        development: api.env(['development', 'storybookDev']),
        allowDeclareFields: true,
        optimizeConstEnums: true,
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: ['@emotion', api.env('development') && 'react-refresh/babel'].filter(Boolean),
})
