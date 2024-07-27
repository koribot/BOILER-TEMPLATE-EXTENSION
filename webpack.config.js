const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    // "modal.content": "./scripts/modal.content.js",
    // mainscript: "./scripts/main.script.js",
    "research.content": "./scripts/research.content.js",
    // popup: "./scripts/popup.js",
    // background: "./scripts/background.js",
    // content: "./scripts/content.js",
    // listingAssistantContentScript: "./scripts/listingAssistantContentScript.js",
    // howto: "./scripts/howto.js",
    // settings: "./scripts/settings.js",
  },
  output: {
    filename: "dist/[name].bundle.js",
    path: path.resolve(__dirname, "bundled-v2.0.12"),
  },
  mode: "production", // Set the mode to production
  plugins: [
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: "html",
    //       to: "html",
    //     },
    //   ],
    // }),
    new CopyPlugin({
      patterns: [
        {
          from: "styles/",
          to: "styles",
        },
      ],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "icons",
          to: "icons",
        },
      ],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          to: "public",
        },
      ],
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: "manifest.json",
    //       to: "./manifest.json",
    //     },
    //   ],
    // }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          // Add the variable names you want to exclude from renaming here
          mangle: {
            reserved: [
              "ebexIdentifier",
              "ePvercel",
              "bv",
              "cv",
              "dv",
              "ePpython",
              "bpy",
              "cpy",
              "dpy",
              "showModal"
            ]
          },
          keep_fnames: [
            "ebexIdentifier",
            "ePvercel",
            "bv",
            "cv",
            "dv",
            "ePpython",
            "bpy",
            "cpy",
            "dpy",
            /showModal/
          ]
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      // Add loaders for images, etc.
    ],
  },
};

//build command = npx webpack --config webpack.config.js
