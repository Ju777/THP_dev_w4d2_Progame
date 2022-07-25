const Dotenv = require('dotenv-webpack');

// (ajouté par Julien)  Pour bundler les fichiers css en un seul fichier css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Webpack utilise ce module Node.js pour travailler avec les dossiers.
const path = require('path');

// Ceci est la configuration principale de ton projet.
// Ici, tu peux écrire les différentes options que tu souhaites, et dire à Webpack quoi faire.
module.exports = (env) => {
    // Ici, faisons un console.log pour voir si ça fonctionne bien :
    console.log("NODE_ENV:", env.NODE_ENV);

    return {
      // Ceci est le chemin vers le "point d'entrée" de ton app.
      // C'est depuis ce fichier que Webpack commencera à travailler.
      entry: './src/index.js',

      // C'est ici qu'on dit à Webpack où mettre le fichier résultant avec tout ton JS.
      output: {
        // Le chemin relatif au dossier courant (la racine du projet)
        path: path.resolve(__dirname, 'dist'),
        // Le nom du fichier de ton bundle JS
        filename: 'bundle.js',
        // L'URL relatif au HTML pour accéder aux assets de l'application. Ici,
        // le HTML est situé à la racine du projet, donc on met une chaîne vide.
        publicPath: '',
      },
      
      // (ajouté par Julien) ici ce sont les règles concernant les loaders.
      module: {
        rules: [
            {
            // Pour le JS
              test: /\.js$/,
              exclude: /(node_modules)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                },
              },
            },
            {
                // Pour le SASS :
                test: /\.(sa|sc|c)ss$/, // On applique notre règle aux fichiers .sass, .scss et .cs
                use: [
                  // Attention, les loaders sont ajoutés en sens inverse !!
                  // Effectivement, c'est le dernier loader qui est exécuté en premier.
                  // Donc celui-ci arrive en fin de chaîne :
                  {
                    // On le met en tout premier, afin qu'il soit exécuté en dernier,
                    // une fois que tous les changements souhaités sont appliqués à notre CSS.
                    loader: MiniCssExtractPlugin.loader,
                  },
                  // (ajouté par Julien) exercice : ajouter Bootstrap
                  // Je l'ai désactivé car il entre en conflit avec le loader de MiniCssExtractPlugin
                  // cf ce forum : https://stackoverflow.com/questions/63539242/module-build-failed-from-node-modules-mini-css-extract-plugin-dist-loader-js
                  // {
                  //   loader: 'style-loader'
                  // },
                  {
                    loader: 'css-loader', // Ce loader permet d'utiliser url() et @import dans ton CSS
                  },
                  {
                    // Ensuite on utilise le loader de postCSS, qui ajoutera un minifier par exemple,
                    // ou bien un préfixeur automatique des règles CSS (--moz par exemple)
                    loader: 'postcss-loader',
                  },
                  {
                    // En premier, on transforme le SASS en CSS :
                    loader: 'sass-loader',
                    options: {
                      implementation: require('sass'),
                    },
                  },
                ],
              },
              {
                // Ajouté par Julien : pour les images
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
              },
              {
                // Ajouté par Julien : pour les fonts
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
              },
          ],
      },

      // Ajouté par Julien : zone pour ajouter les plugins.
      plugins: [
        new MiniCssExtractPlugin({
          filename: 'bundle.css',
        }),
        new Dotenv(),
      ],
      
      // Par défaut, le mode de Webpack est "production". En fonction de ce qui est
      // écrit ici, tu pourras appliquer différentes méthodes dans ton bundle final.
      // Pour le moment, nous avons besoin du mode "développement", car nous n'avons,
      // par exemple, pas besoin de minifier notre code.
      mode: 'development',

      // (ajouté par Julien) Exercice : faire en sorte que webpack mette à jour la page web automatiquement à chaque changement (et donc sans retaper npm run build)
      watch: true,
      watchOptions: {
        // Donne un délai pour permettre à webpack d'ajouter des changements après la modif du premier fichier.
        aggregateTimeout: 600,
        // Pour ignorer la surveillance de gros dossier comme node_modules
        ignored: /node_modules/,
        poll: 1000, // Check for changes every second
      },
      devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 8080,
        hot: true
      }
    }
};