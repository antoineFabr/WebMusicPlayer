import express from "express";
import yts from "yt-search";
import { success } from "./message.js";
import cookieParser from "cookie-parser";

const musicRouteur = express();
const ClientId = "1d60a91953e54bba8808746830d02fb6";

const ClientSecret = "f0b916bb1e124541b013976bbec802d1";
musicRouteur.get("/", async (req, res) => {
  const url = "https://accounts.spotify.com/api/token";

  const encodedCredentials = Buffer.from(
    `${ClientId}:${ClientSecret}`
  ).toString("base64");
  console.log("Encoded Credentials:", encodedCredentials);
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
  console.log(data);
  console.log("Type de data:", typeof data);
  console.log(data.access_token);
  res.cookie("Bearer", data.access_token, {
    maxAge: 3600000,
    httpOnly: true,
  });
  res.send("vous avez un token a present !");
});

musicRouteur.get("/search/", async (req, res) => {
  const token = await getToken(ClientId, ClientSecret);
  console.log("token");
  if (req.body.url) {
    console.log("il y a une url");
    const spotifyRegex =
      /^(https?:\/\/)?open\.spotify\.com(\/intl-[a-zA-Z]{2})?\/(track|album|artist|playlist|episode|show)\/([a-zA-Z0-9]+)(\?.*)?$/;

    const match = req.body.url.match(spotifyRegex);
    if (match) {
      console.log("il y a match");

      //const type = match[1];
      const id = match[4];
      const url = `https://api.spotify.com/v1/tracks/${id}`;
      console.log(id);
      const track = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(track);
      const data = await track.json();
      return res.json(data);
    } else {
      return res.status(404);
    }

    /*const r = await yts(`${req.query.song} by ${req.query.artist} official`);
    const videos = r.videos.slice(0, 1);
    const results = videos.map((v) => success(v.title, v.videoId, v.image));
    return res.json(results);*/
  }
  console.log("pas url");
  res.send("you need to type your request");
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
  console.log(data);
  return data.access_token;
}
export { musicRouteur };
