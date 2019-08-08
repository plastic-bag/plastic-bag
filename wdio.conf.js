const local = {
  port: 9515,
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
    specs: ['./test/browsers/**/*.ts'],
    screenshotPath: './errorShots/',
    baseUrl: 'http://localhost:8001',
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
      ui: 'bdd',
      require: ['tsconfig-paths/register'],
      timeout: 60000
    },
    before: function () {
      console.log('Registering typescript')
      require('ts-node').register({ files: true });
    }
  },
  local
);
