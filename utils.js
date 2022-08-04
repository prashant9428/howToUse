const rp = require('request-promise');
const https = require('https')

module.exports = {
    getReleaseBody :async (repo,tag,token)=>{
        return new Promise(function (resolve,reject){

            var options = {
                uri: `http://localhost:3001/logger`,
                headers: {
                    'user-agent': 'node.js',
                },
                json: true // Automatically parses the JSON string in the response
            };
             
            rp(options)
                .then(function (repos) {
                    //console.log('result', repos);
                    resolve(repos)
                })
                .catch(function (err) {
                    // API call failed...
                    console.log('something went wrong',err)
                    reject(err)
                });

        })

    },
    sendRequest: async()=>{
        try {
            const url = "https://uq2d2dncmaq5zxzoqzqobygwsq0gcywx.lambda-url.ap-south-1.on.aws/";
            https.get(url, res => {
              let data = '';
              res.on('data', chunk => {
                data += chunk;
              });
              res.on('end', () => {
                data = JSON.parse(data);
                console.log(data);
              })
            }).on('error', err => {
              console.log(err.message);
            })
        } catch (error) {
            console.log("error",error)
        }
    }   ,
    filterCommitsFromContext: (body)=>{
        const searchRegExp = /\(.*\)/g;
        body = body.replace(searchRegExp,"")
        body = body.replace(/\n/g,' ');
        const splitCommit = body.split('*')
        return splitCommit
    }
}