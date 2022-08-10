const router = require("express-promise-router")();
const {getReleaseBody,sendRequest} = require("../utils")
const logger  = require('@byjus-orders/byjus-logger')
const child = logger.child({ module: 'router'},{redact:['MIX.IN']})
const {createOrg, getOrgById} = require("../controller/organisation")

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

router.post("/create",async(req,res)=>{
    try {
        await createOrg(req.body)
        return res.status(200).json({
            status: "success"
        });
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            status: "error",
            message: err.message || "Something went wrong"
        })
    }
})


router.get("/:id", async (req, res,next) => {  
    try {

      const {id} = req.params
      const orgData = await getOrgById(id)
        return res.status(200).json({
            status: "success",
            resultBody : orgData
        });
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            status: "error",
            message: err.message || "Something went wrong"
        })
    }
});



module.exports = router;