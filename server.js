'use strict';
const {setExpress} = require("./index")
const http = require('http'); // eslint-disable-line

const run = async function(){
    const app = await setExpress();
    http.createServer(app).listen(3000);
    
    
    console.log('Application started on port', 3000);
}


run()