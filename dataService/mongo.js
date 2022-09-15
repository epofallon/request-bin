const mongoose = require('mongoose');
const reqModel = require('./models');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/requestBin');
}

async function insertOne(req) {
  const reqDoc = new reqModel(req);
  const { _id: id } = await reqDoc.save();
  // const stringId = id.toString();
  // const result = await reqModel.findById(stringId)
  // console.log("Aaron wants to try: ", result)
  return id.toString();
}

function deleteOne(id) {
  return reqModel.findByIdAndDelete(id);
}

function readOne(id) {
  return reqModel.findById(id);
}


module.exports = { insertOne, readOne, deleteOne };