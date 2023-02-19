import express from "express";
import {
  getBinsFromIp,
  binExists as _binExists,
  insert,
  getBinInfoAndRequests,
  createBin,
} from "./dataService/dataService.js";
import { v4 as uuidv4 } from "uuid";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());
app.use(express.static("public"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Got to hompage showing bins and New bin button
app.get("/", (request, response) => {
  response.status(200).sendFile("../frontend/index.html");
});

//Show all the bins
app.get("/bins", async (request, response) => {
  // const ip = request.headers["x-forwarded-for"]; // use this on nginx
  const ip = request.ip; // use this locally
  const bins = await getBinsFromIp(ip);
  if (bins.length > 0) {
    response.status(200).json(bins);
  } else {
    response.status(404).send();
  }
});

//Put request in the bin
app.all("/req/:publicId", async (request, response) => {
  console.log(`${request.method} request received`);
  // if the bin does not exist, send back a 404, else continue
  const binExists = await _binExists(request.params.publicId);
  if (!binExists) {
    response.status(400).json({ error: "bin does not exist" });
  } else {
    await insert(request);
    response.send("thanks");
  }
});

// Show request from a bin and bin info: creation date and status {bins{creationDate: 646464, status: true}}
app.get("/bins/:binId", async (request, response) => {
  const binId = request.params.binId;

  try {
    // const reqs = await dataService.getRequestsFromBin(binId)
    const binAndRequetsObj = await getBinInfoAndRequests(binId);
    response.status(200).json(binAndRequetsObj);
  } catch (err) {
    console.log("In binID", err.message);
    response.status(500).json({ error: err.message });
  }
});

//Creating a bin
app.post("/bins", async (request, response) => {
  try {
    const binId = uuidv4();
    // const ip = request.headers["x-forwarded-for"]; // use this for nginx
    const ip = request.ip; // use this locally
    await createBin(binId, ip);
    response.status(201).json({ binId: binId });
  } catch (err) {
    response.status(400).send();
  }
});

app.listen(port, () => {
  console.clear();
  console.log("Running express app");
});
