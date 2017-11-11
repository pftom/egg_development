'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1510398009790_3874';

  // mongoose config
  config.mongoose = {
    url: 'mongodb://localhost/test',
    options: {},
  };

  // close the csrf
  config.security = {
    csrf: false,
  };

  return config;
};