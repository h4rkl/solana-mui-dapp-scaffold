/* eslint-disable import/no-anonymous-default-export */
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";

export default {
  webpack: {
    plugins: {
      add: [
        new NodePolyfillPlugin({
          excludeAliases: ["console"],
        }),
      ],
    },
  },
};
