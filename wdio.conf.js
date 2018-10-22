const local = {
  port: '9515',
  path: '/',
  capabilities: [
    {
      browserName: 'chrome',
    },
  ],
  services: ['chromedriver'],
};

exports.config = Object.assign(
  {
    specs: ['./test/browsers/**/*.js'],
    screenshotPath: './errorShots/',
    baseUrl: 'http://localhost:8001',
    framework: 'mocha',
    mochaOpts: {
      ui: 'bdd',
    },
  },
  local
);
