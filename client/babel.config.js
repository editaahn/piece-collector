module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          ie: "11",
        },
        useBuiltIns: "usage", // using polyfill library 
        corejs: {
          version: 2,
        },
      },
    ],
  ],
};
