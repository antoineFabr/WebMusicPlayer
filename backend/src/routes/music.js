import express from "express";
import yts from "yt-search";
import { success } from "./message.js";

const musicRouteur = express();

musicRouteur.get("/", (req, res) => {
  res.send("this is the list of music tracks !");
});

musicRouteur.get("/search/", async (req, res) => {
  if (req.query.artist && req.query.song) {
    const r = await yts(
      `${req.query.song} by ${req.query.artist} official audio`
    );
    const videos = r.videos.slice(0, 3);
    videos.forEach(function (v) {
      return res.json(success(v.title, v.videoId, v.image));
    });
  }
  res.send("you need to type your request");
});
export { musicRouteur };
