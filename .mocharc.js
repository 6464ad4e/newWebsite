module.exports = {
  spec: "./tests/**/*.test.js",
  slow: 50000,
  timeout: 60000,
  reporter: "mocha-multi-reporters",
  reporterOptions: ["configFile=reporterConfig.json"],
};
