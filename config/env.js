'use strict';

module.exports =  {
    appName: 'loggerTest',
    databaseConfig:{
        database:'nodecache',
        clusterMode: false,
        credentials: {
            port: '6379',
            host: '127.0.0.1',
        }
    },
    rateLimitConfig: {
        maxHits: 100, //Max request Hits
        window: 60, //window time in seconds
        message: "Too many request from this IP", //message when max hit is reached
    },
    isRateLimitEnabled: true
};
