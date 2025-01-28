const Ytsearch = require("youtube-sr").default;
import YoutubeMp3Downloader from "youtube-mp3-downloader";

var btn = document.getElementById("predownload");

var YD = new YoutubeMp3Downloader({
  ffmpegPath: "/path/to/ffmpeg", // FFmpeg binary location
  outputPath: "/path/to/mp3/folder", // Output file location (default: the home directory)
  youtubeVideoQuality: "highestaudio", // Desired video quality (default: highestaudio)
  queueParallelism: 1, // Download parallelism (default: 1)
  progressTimeout: 2000, // Interval in ms for the progress reports (default: 1000)
  allowWebm: false,
});

//musique
const tempsmusic = 346000;
const name = "veridis quo";
const artist = "daftpunk";

btn.addEventListener("click", download);

async function download() {
  try {
    const id = await searchmusic(name, artist);
    YD.download(id, "veridi quo.mp3");
  } catch (error) {
    console.error(error);
  }
}

async function searchmusic(name, artist) {
  try {
    const request = `${name} by ${artist} official`;
    const videos = await Ytsearch.search(request, { limit: 5, type: "video" });

    for (const video of videos) {
      //temps en miliseconde !!
      //a refaire pour voir plutot le nombre de like ou de vues
      if (video.duration === tempsmusic) {
        return video.id;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

/*async function downloadFromYt(id) {
  try {
    const info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`);

    const audioFormat = ytdl.chooseFormat(info.formats, {
      quality: "highestaudio",
    });

    const audioStream = ytdl.downloadFromInfo(info, { format: audioFormat });
    const buffer = streamTo
  } catch (error) {
    console.error(error);
  }
}*/
