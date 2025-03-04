import "./style.css";
import { Howl, Howler } from "howler";
import { gsap } from "gsap/gsap-core";
//import Buffer from "buffer/";
//const {Howl, Howler} = require('howler');
const barremax = 150;
let secondeBarre = 0;
let pixelBarre = 0;
let duration;
var btn = document.getElementById("button");
var searchbtn = document.getElementById("search");
var start = false;
var volume = document.getElementById("volume");
const barreMusique = document.getElementById("temps");
const imageMusique = document.getElementById("cover");

//event de si on appuie sur le boutton
setInterval(function () {
  sound.volume(volume.value / 30);
}, 1000);

//initialisation de l'objet de la musique
var sound = new Howl({
  src: ["../music/spotifydown.com - Veridis Quo - Daft Punk.mp3"],
  id: [1],
});

btn.addEventListener("click", updateBTN);
barreMusique.addEventListener("change", console.log("click"));

function updateBTN() {
  if (start === false) {
    sound.play();

    btn.value = "play";

    start = true;
    duration = sound.duration(1);
    console.log(duration);
    tempsMusique();
  } else {
    btn.value = "pause";
    start = false;
    sound.pause();
  }
  sound.on("end", function () {
    btn.value = "pause";
    start = false;
    sound.pause();
    secondeBarre = 0;
  });

  /*if(){
    sound.stop();
    btn.value = "stop";
  }
  else{
    btn.value = "play";
    sound.play();
  }*/
}

let tempsMusique = () => {
  gsap.to(barreMusique, {
    value: 100,
    duration: duration,
  });
};

searchbtn.addEventListener("click", () => {
  const champSong = document.getElementById("musicName").value;
  const champArtist = document.getElementById("artistName").value;
  getToken(ClientId, ClientSecret);
});
async function getToken(ClientId, ClientSecret) {
  const url = "https://accounts.spotify.com/api/token";
  try {
    const results = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        Autorization: "Basic" + `${ClientId}:${ClientSecret}`,
      },
      form: {
        grant_type: "client_credentials",
      },
      json: true,
    });
    results.json().then((data) => {
      console.log(data);
    });
  } catch (err) {
    console.log(err);
  }
}
async function search(song, artist) {
  console.log(song);
  console.log(artist);
  const url = `https://api.spotify.com/v1/search?q=${song}&type=track`;
  try {
    const result = await fetch(url, {
      headers: {
        Autorization: ``,
      },
      method: "GET",
      mode: "cors",
    });
    console.log("hello");
    result.json().then((data) => {
      console.log(data);
      //imageMusique.src = data[0].image;
    });
  } catch (err) {
    console.log(err);
  }
}
