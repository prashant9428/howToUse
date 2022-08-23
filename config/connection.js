

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
        hooks:{
            // beforeFindAfterExpandIncludeAll(options){
            //     console.log("beforeFindAfterExpandIncludeAll",options)
            // }
            // beforeCreate(Model,Options){
            //     console.log("model",Model)
            //     Model.setDataValue('name','ppppp')
            //     console.log("Options",Options)

            // },
            // beforeUpdate(Model,Options){
            //     console.log("model",Model)
            //     console.log("Options",Options) 
            // },
            // beforeDestroy(Model,Options){

            // }
        }
    },


});


sequelize.addHook('beforeFind',function(options){
   // console.log("model", model)
  //const model = new this
  const model = this
   if(model.rawAttributes.hasOwnProperty("orgId")){
       if(options?.where){
           options.where['orgId'] = "2"
       }else{

           options['where'] = {'orgId':'2'}
       }
   }

   console.log("options",options)

})

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


