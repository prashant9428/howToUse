const {sequelize} = require("../config/connection");
const User = require("../model/userModel")(sequelize);

module.exports.createUser = async (userData) => {
  try {
    const res = await User.create(userData);
  } catch (error) {
    console.log('error',error)
    throw new Error(error)
  }

};

module.exports.getUserByOrg = async (id) => {
  try {
   const res = await User.findOne({where:{name:'ravi'}})
  // console.log("result",res)
   return res
  } catch (error) {
    console.log('error',error)
    throw new Error(error)
  }
}

