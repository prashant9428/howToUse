

const { Sequelize, DataTypes, Op, QueryTypes } = require("sequelize");
const { port, user, password, host, database } = require("./dbConfig")



const sequelize = new Sequelize(database, null, null, {

    dialect: "postgres",
    port: port,
    logging: false,
    host: host,
    username: user,
    password: password,
    pool: {
        max: 20,
        min: 0,
        idle: 20000,
        handleDisconnects: true,
        evict: 30000,

    },

    dialectOptions: {
        dateStrings: true,
        typeCast: true,

    },

    timezone: "+05:30",
    define: {
        freezeTableName: true,
        timestamps: true,
        hooks: {

            // beforeValidate(model){
            //     console.log('model',model)
            // },
            // beforeQuery(queryOptions,AbstractQuery){
            //     console.log('queryOptions',queryOptions)
            //     console.log("AbstractQuery",AbstractQuery)
            // },
            
            beforeFind(options) {
                console.log('query', options)

                if (options?.where) {
                    options.where['orgId'] = 2
                } else {
                    options['where'] = { "orgId": 2}
                }

                console.log("query", options)

            }
        }
    },

});

//sequelize.addHook('beforeFind')

async function checkConnection() {
    try {
        await sequelize.sync({
            force: false,
        });
        console.log("connection successful")
        await sequelize.authenticate();
    } catch (error) {
        console.log("failed connection", error)
    }
}

checkConnection()

// sequelize.addHook('beforeFind', (query) => {
//    console.log('query',query)
//    query['where'] = {"orgId":1}
//    console.log("query",query)

// });

module.exports = { sequelize, Sequelize, DataTypes, Op, QueryTypes };


