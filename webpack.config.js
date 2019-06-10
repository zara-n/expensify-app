//entry -> output
const path = require("path"); //built in node function

//console.log(path.join(__dirname, 'public')); //(__dirname) provides the path to the current location

module.exports = {
  //is a node thing, a way to expose something to another file
  entry: "./src/app.js", //where it should start
  output: {
    path: path.join(__dirname, "public"), //the absolute path where we want to put our bundle file, not allowed to use "./"
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
          use: [
              'style-loader',
              'css-loader',
              'sass-loader'
          ]
      }
    ]
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true
  }
};
