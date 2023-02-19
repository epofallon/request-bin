import { insertOne, deleteOne, readMany } from "./mongo.js";
import {
  insertRequest,
  createBin as _createBin,
  binExists as _binExists,
  getBinArrayFromIp,
  getRequestIdsFromBin,
  getBinInfo,
} from "./postgresService.js";

// eslint-disable-next-line max-lines-per-function
export async function insert(request) {
  const req = {
    ip: request.headers["x-forwarded-for"], // use this for nginx
    // ip: request.ip, // use this locally
    path: request.url,
    method: request.method,
    headers: request.headers,
    body: JSON.stringify(request.body),
  };

  let mongoId;
  try {
    mongoId = await insertOne(req);
    console.log(`Created request in mongo with id: ${mongoId}`);
  } catch (error) {
    // ABORT
  }

  try {
    const result = await insertRequest(mongoId, request.params.publicId);
    // throw error;
  } catch (error) {
    console.error(error.message);
    const mongoResult = await deleteOne(mongoId);
    // // console.log(mongoResult);
    // // console.log(`Deleted request in mongo with id: ${mongoId}`);
    // const readOneResult = await mongo.readOne(mongoId);
    // console.log(readOneResult);
  }
}

export async function createBin(binId, ip) {
  // call postgres service to do this for me
  const result = await _createBin(binId, ip);
  return result;
}

export async function binExists(publicId) {
  return _binExists(publicId);
}

//returns an array of public bin IDs given an IP address
export async function getBinsFromIp(ip) {
  let result;
  try {
    result = await getBinArrayFromIp(ip);
  } catch (err) {
    console.log("get bins from IP failed\n", err);
  }

  return result;
}

//returns an array of requests given a bin ID
async function getRequestsFromBin(publicBinId) {
  //get an array of document IDs from postgres

  const mongoIdArr = await getRequestIdsFromBin(publicBinId);
  if (mongoIdArr.length === 0) {
    return [];
  }

  //use the array of document IDs to pull requests from mongo
  const requestArr = await readMany(mongoIdArr);
  return requestArr;
}

//returns the sitched together object {bin: info, request: [requests]}
export async function getBinInfoAndRequests(binID) {
  const requests = await getRequestsFromBin(binID);
  const binInfo = await getBinInfo(binID);
  console.log(binInfo);
  return { binInfo, requests };
}
