import express, { json, text, urlencoded } from "express";
import dataService from "../dataService/dataService";
const app = express();
import { v4 as uuidv4 } from "uuid";
port = 4567;

app.use(json());
app.use(text());
app.use(urlencoded());

app.get("/bin/:binId", async (request, response) => {
  const binId = request.params;
  console.log(request);
  try {
    // const data = dataServices.someMethod to do this call to SQL for our bin data
    response.status(200);
    // response.json(data);
  } catch (err) {
    console.log(err);
    response.status(400);
    response.json({ error: err.message });
  }
});

app.post("/bin", async (request, response) => {
  const ip = request.ip;
  const binId = uuidv4();
  // dataservices.createBin
  console.log(request.headers["x-forwarded-for"]);

  response.redirect(`/bin/${binId}`);
});

app.listen(port, () => console.log("Running express app"));
