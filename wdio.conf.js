exports.config = {
    runner: 'local',
    path: '/',
    specs: [
        './test/**/*.ts'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome',
    }],
    logLevel: 'error',
    bail: 0,
    baseUrl: 'http://localhost:8001',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: ['chromedriver'],
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
}
