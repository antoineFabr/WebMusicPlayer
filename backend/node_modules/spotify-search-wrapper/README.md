<div align="center">

# Spotify Search

<img src="https://img.shields.io/github/v/release/GFrancV/spotify-search?style=for-the-badge" alt="GitHub Release">
<a href="https://github.com/GFrancV/spotify-search/actions/workflows/publish.yml">
	<img src="https://img.shields.io/github/actions/workflow/status/GFrancV/spotify-search/publish.yml?style=for-the-badge&label=Publish" alt="Publish">
</a>

</div>

<p align="center">
  <a href="#overview">Overview</a>
  •
  <a href="#installation">Installation</a>
  •
  <a href="#usage">Usage</a>
</p>

## Overview

Spotify Search is a package to search for Spotify tracks and playlists without the need for a token, totally transparent to the user and that uses the official [Spotify Web API](https://developer.spotify.com/documentation/web-api).

## Installation

Package install with with npm

```
npm i spotify-search-wrapper
```

## Usage

### Search

#### Searching track's

```js
const spotifySearch = require("spotify-search-wrapper");

spotifySearch.searchTrack("Never Gonna Give You Up").then(tracks => {
	console.log(tracks[0].id); // 4PTG3Z6ehGkBFwjybzWkR8
	console.log(tracks[0].name); // Never Gonna Give You Up
	console.log(tracks[0].href); // https://api.spotify.com/v1/tracks/4PTG3Z6ehGkBFwjybzWkR8
	console.log(tracks[0].artists[0].name); // Rick Astley
});
```

#### Searching playlist's

```js
const spotifySearch = require("spotify-search");

spotifySearch.searchPlaylist("Top 50 - Global").then(playlists => {
	console.log(playlists[0].id); // 37i9dQZEVXbMDoHDwVN2tF
	console.log(playlists[0].name); // Top 50 - Global
	console.log(playlists[0].href); // https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF
	console.log(playlists[0].owner.id); // spotify
});
```

#### Get Track info

```js
const spotifySearch = require("spotify-search");

await spotifySearch.getTrackInfoById("4PTG3Z6ehGkBFwjybzWkR8").then(track => {
	console.log(track.id); // 4PTG3Z6ehGkBFwjybzWkR8
	console.log(track.name); // Never Gonna Give You Up
	console.log(track.href); // https://api.spotify.com/v1/tracks/4PTG3Z6ehGkBFwjybzWkR8
	console.log(track.artists[0].name); // Rick Astley
});
```

#### Get Playlist info

```js
const spotifySearch = require("spotify-search");

spotifySearch.getPlaylist("37i9dQZEVXbMDoHDwVN2tF").then(playlist => {
	console.log(playlist.id); // 37i9dQZEVXbMDoHDwVN2tF
	console.log(playlist.name); // Top 50 - Global
	console.log(playlist.href); // https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF
	console.log(playlist.owner.id); // spotify
});
```

### Tools

#### Validate Spotify id

```js
const spotifySearch = require("spotify-search");

console.log(spotifySearch.validateTrackID("4PTG3Z6eh")); // Output: true
console.log(spotifySearch.validateTrackID("")); // Output: false
console.log(spotifySearch.validateTrackID("hello")); // Output: false
```
