const express = require("express");
const server = express();
const cors = require('cors');


const { initLogger } = require('@prashant/byjus-logger');



const { contextMiddleware, correlationMiddleware, logger } = initLogger({
    pretty: false,
    //    targetFile: "./logs/pino3.log",
    redact:[],
    env: "development",
},{
    service: "ums",
});

// set levels
logger.setLevel("debug");
const pasteBinRouter = require("./routes/router");

// const sequelize = connect();

server.use(express.json());

server.use(cors());

server.use(correlationMiddleware());
server.use(contextMiddleware(logger));
server.use('/logger', pasteBinRouter);
// logger.error(new Error("something went wrong"))
server.listen(3003, () => {
    try {
    logger.info({'message':"log"},'server is running on port 3000');
    throw new Error("something went wrong")
    } catch (error) {
    logger.error(error)
    }
    
})


server.use((err, req, res, next) => {
    logger.error(err);
    res.status(err.statusCode || 500).json({
        status: "error-global",
        message: err.message || "Something went wrong"
    })
})