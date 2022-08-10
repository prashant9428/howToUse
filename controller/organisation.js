const {sequelize} = require("../config/connection")
const Org = require("../model/organisationModel")(sequelize);

module.exports.createOrg = async (body) => {
  try {
    const res = await Org.create({
      orgName: body.name,
      orgUrl: body.url
    });
  } catch (error) {
    console.log('error',error)
    throw new Error(error)
  }

};

module.exports.getOrgById = async (id) => {
  try {
    return await Org.findOne({where:{
      "orgId": id
    }})
  } catch (error) {
    console.log('error',error)
    throw new Error(error)
  }
}

