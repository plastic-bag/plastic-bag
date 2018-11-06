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
    specs: ['./test/**/*.ts'],
    screenshotPath: './errorShots/',
    baseUrl: 'http://localhost:8001',
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
      ui: 'bdd',
      compilers: ['ts:ts-node/register'],
      requires: ['source-map-support/register'],
      timeout: 60000
    },
    onPrepare: function (config, capabilities) {
      console.log('Registering typescript')
      require('ts-node/register');
    }
  },
  local
);
