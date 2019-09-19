//entry -> output
const path = require("path"); //built in node function
const webpack = require("webpack");
const ExtractTextplugin = require("extract-text-webpack-plugin");

process.env.NODE_ENV = process.env.NODE_ENV || "development"; //environment variable, stores the environment you're currently in

if (process.env.NODE_ENV === "test") {
  require("dotenv").config({ path: ".env.test" });
} else if (process.env.NODE_ENV === "development") {
  require("dotenv").config({ path: ".env.development" });
}

//console.log(path.join(__dirname, 'public')); //(__dirname) provides the path to the current location

module.exports = env => {
  const isProduction = env === "production";
  const CSSExtract = new ExtractTextplugin("styles.css");

  return {
    //is a node thing, a way to expose something to another file
    entry: ["babel-polyfill", "./src/app.js"], //where it should start
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
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        "process.env.FIREBASE_API_KEY": JSON.stringify(
          process.env.FIREBASE_API_KEY
        ),
        "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(
          process.env.FIREBASE_AUTH_DOMAIN
        ),
        "process.env.FIREBASE_DATABASE_URL": JSON.stringify(
          process.env.FIREBASE_DATABASE_URL
        ),
        "process.env.FIREBASE_PROJECT_ID": JSON.stringify(
          process.env.FIREBASE_PROJECT_ID
        ),
        "process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(
          process.env.FIREBASE_STORAGE_BUCKET
        ),
        "process.env.FIREBASE_MESSENGING_SENDER_ID": JSON.stringify(
          process.env.FIREBASE_MESSENGING_SENDER_ID
        ),
        "process.env.FIREBASE_APP_ID": JSON.stringify(
          process.env.FIREBASE_APP_ID
        )
      })
    ],
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true,
      publicPath: "/dist/"
    }
  };
};
