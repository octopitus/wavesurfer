module.exports = function(api) {
  api.cache(true)

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@aurora': './aurora',
            '@assets': './assets',
            '@core': './core',
            '@api': './src/api',
            '@store': './src/store',
            '@auth': './src/auth',
            '@navigation': './src/navigation',
            '@setting': './src/setting'
          }
        }
      ]
    ]
  }
}
