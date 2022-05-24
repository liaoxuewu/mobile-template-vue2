module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3
      }
    ]
  ],

  env: {
    development: {
      plugins: ['dynamic-import-node']
    }
  },
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-syntax-jsx',
    '@babel/plugin-transform-runtime',
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        // style: true,
        // 指定样式路径
        style: name => `${name}/style/less`
      },
      'vant'
    ]
  ]
}
