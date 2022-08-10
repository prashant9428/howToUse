const express = require("express");
const server = express();
const cors = require('cors');
const {appName, databaseConfig, isRateLimitEnabled, rateLimitConfig} = require('./config/env')
const { initLogger } = require('@byjus-orders/byjus-logger');
const {initRateLimit} = require('@prashant/nauth')

const setExpress = async function(){
    const { contextMiddleware, correlationMiddleware, logger:log } = initLogger({
        pretty: true,
        //    targetFile: "./logs/pino3.log",
        redact:[],
        env: "development",
    },{
        service: "ums",
    });
    
    // set levels
    //log.setLevel("debug");
    const org = require("./service/org");
    const user = require("./service/user")
    
    // const sequelize = connect();
    
    server.use(express.json());
    
    server.use(cors());
    server.use(correlationMiddleware());
    server.use(contextMiddleware(log));
    
    // server.use('/logger',await initRateLimit(
    //     {
    //         databaseConfig,
    //         rateLimitConfig,
    //         appName,
    //         isRateLimitEnabled
    //     }, 
    //     {
    //         onError: (error)=>{
    //             logger.error({ method: "setupExpress" }, `error: ${error.message || "Uncaught Error"}`);
    //         },
    //         onExit: (error)=>{
    //             logger.error({ method: "setupExpress" }, `error: ${error.message || "Uncaught Error"}`);
    //             // process.exit();  // disabeling for initial release
    //         }
    //     }
    //   ));
    
    server.use('/org', org);
    server.use('/user',user)
    
    
    
    
    // logger.error(new Error("something went wrong"))
    // server.listen(3000, () => {
    //     try {
    //     log.info({'message':"log"},'server is running on port 3000');
       
    //     } catch (error) {
    //     log.error("this is the error")
    //     }
        
    // })
    
    
    // server.use((err, req, res, next) => {
    //     res.status(err.statusCode || 500).json({
    //         status: "error-global",
    //         message: err.message || "Something went wrong"
    //     })
    // })

    return server
}


module.exports = {
    setExpress
}
