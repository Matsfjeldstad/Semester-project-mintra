const { resolve } = require('path');

export default {
  root: resolve(__dirname, 'src'),
  build: {
    rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/index.html'),
          login: resolve(__dirname, 'src/login.html'),
          signup: resolve(__dirname, 'src/signup.html'),
          avatarPage: resolve(__dirname, 'src/add-profile-pic.html'),
          allListing: resolve(__dirname, 'src/all-listings.html'),
          spesificListing: resolve(__dirname, 'src/spesific-listing.html'),
        },
    },
},
  server: {
    port: '6060',
    hot: true,
  },
};