const bunyan = require('bunyan');

const bunyanLogger = bunyan.createLogger({
  name: 'Servercentral',
  serializers: {
    err: bunyan.stdSerializers.err,
  },
});

module.exports = bunyanLogger;
