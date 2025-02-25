import "./style.css";
import { Howl, Howler } from "howler";
import { gsap } from "gsap/gsap-core";
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
  search(champSong, champArtist);
});

async function search(song, artist) {
  console.log(song);
  console.log(artist);
  const url = `http://localhost:3000/music/search/?song=${song}&artist=${artist}`;
  try {
    const result = await fetch(url, {
      method: "GET",
      mode: "cors",
    });
    console.log("hello");
    result.json().then((data) => {
      console.log(data);
    });
  } catch (err) {
    console.log(err);
  }
}
