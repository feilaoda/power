
module.exports = {
  mongodb: {
    "default": true,
    development: {
      name: 'power',
      port: 27017,
      host: '127.0.0.1'
    },
    test: {
      name: 'power-test',
      port: 27017,
      host: '127.0.0.1'
    },
    staging: {
      name: 'power-staging',
      port: 27017,
      host: '127.0.0.1'
    },
    production: {
      name: 'power',
      port: 27017,
      host: '127.0.0.1'
    }
  },
  redis: {
    development: {
      name: 'power-development',
      port: 6397,
      host: '127.0.0.1'
    },
    test: {
      name: 'power-test',
      port: 6397,
      host: '127.0.0.1'
    },
    staging: {
      name: 'power-staging',
      port: 6397,
      host: '127.0.0.1'
    },
    production: {
      name: 'power-production',
      port: 6397,
      host: '127.0.0.1'
    }
  }
};
