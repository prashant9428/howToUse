const router = require("express-promise-router")();
const {createUser, getUserByOrg} = require("../controller/user")

// const hpropagate = require("hpropagate")()

router.get("/", async (req, res,next) => {
  
    // child.info({MIX: {IN: true}},'i am the log');
    // child.debug("into the function")
    
    try {
        //await getReleaseBody()
        const user = await getUserByOrg()
        return res.status(200).json({
            status: "success",
            resultBody : user
        });
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            status: "error",
            message: err.message || "Something went wrong"
        })
    }
});

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


router.post("/create", async (req, res, next) => {
    try {
        const data = req.body;
        await createUser(data)
        res.status(200).json({
            data: data,
            status: "success"
        })
    } catch (err) {
       console.log(err)
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