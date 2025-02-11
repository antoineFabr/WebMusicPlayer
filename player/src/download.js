import YouTube from "youtube-sr";
//import YoutubeMp3Downloader from "youtube-mp3-downloader";

/*var YD = new YoutubeMp3Downloader({
  ffmpegPath: "/", // FFmpeg binary location
  outputPath: "/path/to/mp3/folder", // Output file location (default: the home directory)
  youtubeVideoQuality: "highestaudio", // Desired video quality (default: highestaudio)
  queueParallelism: 1, // Download parallelism (default: 1)
  progressTimeout: 2000, // Interval in ms for the progress reports (default: 1000)
  allowWebm: false,
});*/

//musique
const tempsmusic = 346000;
const name = "veridis quo";
const artist = "daftpunk";
//const musicName = getElementById("musicName");
const search = document.getElementById("search");
//const artistName = getElementById("artistName");

search.addEventListener("click", searchmusic());

/*async function download() {
  try {
    const id = await searchmusic(name, artist);
    YD.download(id, "veridi quo.mp3");
  } catch (error) {
    console.error(error);
  }
}*/

async function searchmusic() {
  const videos = await YouTube.search("playing with fire", { limit: 3 });
  console.log(
    videos.map((m, i) => `[${++i}] ${m.title} (${m.url})`).join("\n")
  );
  console.log("hello");
}

/*async function searchmusic(name, artist) {
  try {
    const request = `${name} by ${artist} official`;
    const videos = await Ytsearch.search(request, { limit: 5, type: "video" });

    for (const video of videos) {
      //temps en miliseconde !!
      //a refaire pour voir plutot le nombre de like ou de vues
      if (video.duration === tempsmusic) {
        console.log(video.id);
        return video.id;
      }
    }
  } catch (error) {
    console.error(error);
  }
}*/

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
