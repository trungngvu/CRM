const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@history': path.resolve(__dirname, 'src/browser-history'),
      '@components': path.resolve(__dirname, 'src/app/components'),
      '@configs': path.resolve(__dirname, 'src/app/configs'),
      '@core': path.resolve(__dirname, 'src/app/core'),
      '@hoc': path.resolve(__dirname, 'src/app/hoc'),
      '@hooks': path.resolve(__dirname, 'src/app/hooks'),
      '@layout': path.resolve(__dirname, 'src/app/layout'),
      '@pages': path.resolve(__dirname, 'src/app/pages'),
      '@services': path.resolve(__dirname, 'src/app/services'),
      '@store': path.resolve(__dirname, 'src/app/store'),
      '@types': path.resolve(__dirname, 'src/app/types'),
      '@utils': path.resolve(__dirname, 'src/app/utils'),
    },
  },
};
