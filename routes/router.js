const router = require("express-promise-router")();
const {getReleaseBody,sendRequest} = require("../utils")
const logger  = require('@byjus-orders/byjus-logger')
const child = logger.child({ module: 'router'},{redact:['MIX.IN']})
// const hpropagate = require("hpropagate")()

router.get("/", async (req, res,next) => {
  
    // child.info({MIX: {IN: true}},'i am the log');
    // child.debug("into the function")

    try {
        //await getReleaseBody()
       // await getReleaseBody()
        return res.status(200).json({
            status: "success"
        });
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            status: "error",
            message: err.message || "Something went wrong"
        })
    }
});


router.post("/", async (req, res, next) => {
    logger.info("Router: POST /createData");
    try {
        const data = req.body;
        res.status(200).json({
            data: data,
            status: "success"
        })
    } catch (err) {
        logger.error(err);
        next(err);
    }
});

router.delete("/", async (req, res, next) => {
    logger.info("Router: DELETE /deleteData");
    try {
        const id = req.query.id;
        res.status(200).json({
            data: id,
            status: "success"
        })
    } catch (err) {
        logger.error(err);
        next(err);
    }
});

module.exports = router;