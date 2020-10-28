'use strict'

var config = {};

config.development = {
  port: 8080,
  apiURL: 'http://localhost:8080',
  intuit: {
    clientId: 'AB017daB5Gv4hiUCbhTZdPuVXFu84hCPO1kswMk7M01LjwEgfc',
    clientSecret: 'aFFYbqYPEhnKTAZMUzye9ZTcUBDcm1Ny5HqCwxN3',
    environment: 'sandbox',
    redirectUri: 'http://localhost:8080/api/user/authenticated/intuit/',
    state: 'testState',
    grant_type: 'authorization_code'
  }
};
config.default = {
  apiURL: 'http://localhost:8080',
  intuit: {
    clientId: 'AB017daB5Gv4hiUCbhTZdPuVXFu84hCPO1kswMk7M01LjwEgfc',
    clientSecret: 'aFFYbqYPEhnKTAZMUzye9ZTcUBDcm1Ny5HqCwxN3',
    environment: 'sandbox',
    redirectUri: 'http://localhost:8080/api/user/authenticated/intuit/',
    state: 'testState',
    grant_type: 'authorization_code'
  }
}
config.test = {};
config.staging = {};
config.staging = {};
config.production = {
  apiURL: 'http://localhost:8080',
  intuit: {
    clientId: 'AB017daB5Gv4hiUCbhTZdPuVXFu84hCPO1kswMk7M01LjwEgfc',
    clientSecret: 'aFFYbqYPEhnKTAZMUzye9ZTcUBDcm1Ny5HqCwxN3',
    environment: 'sandbox',
    redirectUri: 'http://localhost:8080/api/user/authenticated/intuit/',
    state: 'testState',
    grant_type: 'authorization_code'
  }
}

let mode = String(process.env.MODE).trim()

if (process.env.MODE) {
  if (config[mode]) {
    config = config[mode]
  } else {
    config = config.default
  }
}

config.setValue = (value) =>{
  config.intuit = {...config.intuit, ...value}
}

module.exports = config;