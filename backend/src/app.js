import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.get("/", (req, res) => {
  res.send("listener");
});

import { musicRouteur } from "./routes/music.js";
app.use("/music", musicRouteur);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
