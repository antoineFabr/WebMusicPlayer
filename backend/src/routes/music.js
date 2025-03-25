import express from "express";
import yts from "yt-search";
import { success } from "./message.js";
import cookieParser from "cookie-parser";

const musicRouteur = express();
const ClientId = "1d60a91953e54bba8808746830d02fb6";

const ClientSecret = "f0b916bb1e124541b013976bbec802d1";

musicRouteur.post("/search/", async (req, res) => {
  const token = await getToken(ClientId, ClientSecret);
  console.log(token);
  const url = req.body.url;
  console.log(url);
  try {
    const results = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      "Content-Type": "application/json",

      mode: "cors",
    });
    const data = await results.json();
    console.log(data);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});
async function getToken(ClientId, ClientSecret) {
  const url = "https://accounts.spotify.com/api/token";

  const encodedCredentials = Buffer.from(
    `${ClientId}:${ClientSecret}`
  ).toString("base64");

  const results = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
    json: true,
  });
  const data = await results.json();

  return data.access_token;
}
export { musicRouteur };
