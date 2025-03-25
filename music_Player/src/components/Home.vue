<template>
  <header>
    <h1>Music Player</h1>
    <a href="download.html">search</a>
  </header>
  <form @submit.prevent="search">
    <p>music name</p>
    <input type="text" placeholder="song" v-model="song" />
    <p>artist name</p>
    <input type="text" placeholder="artist" v-model="artist" />
    <button type="submit">rechercher</button>
  </form>

  <div>song : {{ song }}</div>
  <div>artist : {{ artist }}</div>
  <div v-if="albumInfo">
    <img :src="albumInfo" />
  </div>
  <div id="app"></div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const ClientId = "1d60a91953e54bba8808746830d02fb6";
const ClientSecret = "f0b916bb1e124541b013976bbec802d1";
const artist = ref("");
const song = ref("");
const albumInfo = ref("");
const search = async () => {
  try {
    const TrackName = song.value;
    const artistName = artist.value;
    const resultsong = TrackName.replace(/ /g, "+");

    const resultartist = artistName.replace(/ /g, "+");

    const query = `track%3A${resultsong}+artist%3A${resultartist}`;

    const url = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`;
    const url2 = `http://localhost:3000/music/search/`;

    const results = await fetch(url2, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
      }),
    });
    const data = await results.json();
    console.log(data.tracks.items[0].album.images[0].url);
    if (data.tracks?.items?.[0]?.album?.images?.[0]?.url) {
      albumInfo.value = data.tracks.items[0].album.images[0].url;
    } else {
      albumInfo.value = "";
    }
  } catch (err) {
    console.log(err);
  }
};
const getToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: ClientId,
      client_secret: ClientSecret,
    }),
  });
  const data = await response.json();
  return data.access_token;
};
</script>
