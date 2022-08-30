const path = require("path");
const HubSpotAutoUploadPlugin = require("@hubspot/webpack-cms-plugins/HubSpotAutoUploadPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = ({ portal, autoupload }) => ({
  mode: "production",

  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/index.js",
  },

  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin({
      exclude: /\/tools/
    })],
  },

  module: {
    rules: [
      {
        test: /((?![_macros|main|theme-overrides]))\.css$/,
        include: path.resolve(__dirname, "src"),
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },

  plugins: [
    new HubSpotAutoUploadPlugin({
      portal,
      autoupload,
      src: "dist",
      dest: "hubspot-ones-theme",
    }),

    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: "src/images", to: "images" },
        { from: "src/templates", to: "templates" },
        { from: "src/modules", to: "modules" },
        { from: "src/css", to: "css" },
        { from: "src/js", to: "js" }, 
        { from: "src/sections", to: "sections" },
        { from: "src/fields.json", to: "fields.json" },
        { from: "src/license.txt", to: "license.txt" },
        { from: "src/theme.json", to: "theme.json" },
      ],
    }),
  ],
});