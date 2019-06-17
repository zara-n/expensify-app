//entry -> output
const path = require("path"); //built in node function
const ExtractTextplugin = require("extract-text-webpack-plugin");

//console.log(path.join(__dirname, 'public')); //(__dirname) provides the path to the current location

module.exports = env => {
  const isProduction = env === "production";
  const CSSExtract = new ExtractTextplugin("styles.css");

  return {
    //is a node thing, a way to expose something to another file
    entry: "./src/app.js", //where it should start
    output: {
      path: path.join(__dirname, "public", "dist"), //the absolute path where we want to put our bundle file, not allowed to use "./"
      filename: "bundle.js"
    },
    module: {
      //loader: (how a file gets transformed when Webpack uses it)
      rules: [
        {
          loader: "babel-loader",
          test: /\.js$/, //what do we want to run the loader on
          exclude: /node_modules/ //allows us to exclude a set of files
        },
        {
          test: /\.s?css$/,
          use: CSSExtract.extract({
            use: [
              {
                loader: "css-loader",
                options: {
                  sourceMap: true
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        }
      ]
    },
    plugins: [CSSExtract],
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true,
      publicPath: "/dist/"
    }
  };
};
