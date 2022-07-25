if (process.env.NODE_ENV === 'production') {
    module.exports = {
      plugins: [
        require('autoprefixer'),
        require('cssnano'),
        // Tous les modules PostCSS que tu souhaites trouvables ici : https://github.com/postcss/postcss
      ],
    };
  }