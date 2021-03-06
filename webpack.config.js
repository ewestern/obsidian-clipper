const path = require('path');
module.exports = {
	entry: {
		content: "./src/content.ts",
		action: "./src/action.ts",
		options: "./src/options.ts",
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
