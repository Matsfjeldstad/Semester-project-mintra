const { resolve } = require('path');

export default {
  root: resolve(__dirname, 'src'),
  resolve: {
    main: resolve(__dirname, 'src/index.html'),
    login: resolve(__dirname, 'src/login.html'),
    signup: resolve(__dirname, 'src/signup.html'),
    alias: {},
  },
  server: {
    port: '6060',
    hot: true,
  },
};