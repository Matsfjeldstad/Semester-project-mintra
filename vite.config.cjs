const { resolve } = require('path');

export default {
  root: resolve(__dirname, 'src'),
  build: {
    outDir: '../dist',
    emptyOutDir: true ,
    rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/index.html'),
          login: resolve(__dirname, 'src/login.html'),
          signup: resolve(__dirname, 'src/signup.html'),
          allListing: resolve(__dirname, 'src/all-listings.html'),
          spesificListing: resolve(__dirname, 'src/spesific-listing.html'),
          dashboard: resolve(__dirname, 'src/dashboard/index.html'),
          makeListing: resolve(__dirname, 'src/dashboard/make-listing.html'),
          editListing: resolve(__dirname, 'src/dashboard/edit-listing.html'),
          allYourListings: resolve(__dirname, 'src/dashboard/your-listings.html'),
          addavatarPage: resolve(__dirname, 'src/dashboard/add-profile-pic.html'),
          updateAvatarPage: resolve(__dirname, 'src/dashboard/update-avatar.html'),
        },
    },
},
  server: {
    port: '6060',
    hot: true,
  },
};