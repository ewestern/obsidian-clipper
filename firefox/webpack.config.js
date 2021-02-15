const path = require('path');
module.exports = {
	entry: {
		content: "./src/content.ts",
    popup: "./src/action.ts"
	},
  output: {
    path: path.resolve(__dirname, 'dist'),
		filename: "[name].js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  module: {
    rules: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      { test: /\.tsx?$/, use: ["ts-loader"], exclude: /node_modules/ },
    ],
  },
};
