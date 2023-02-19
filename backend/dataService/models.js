import { Schema, model } from "mongoose";

const reqSchema = new Schema({
  ip: { type: String, required: true },
  path: { type: String, required: true },
  method: { type: String, required: true },
  headers: { type: {}, required: true },
  body: { type: String, required: true },
});

const reqModel = model("reqModel", reqSchema);

export default reqModel;
