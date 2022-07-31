import axios from "axios";
import { BASE_URL, API_KEY } from "@/api-config";

function getSearchOptions(str) {
  return {
    method: "GET",
    url: BASE_URL + "search",
    params: { q: str },
    headers: {
      "x-rapidapi-host": "genius.p.rapidapi.com",
      "x-rapidapi-key": API_KEY,
    },
  };
}

//extract relevant info from request song data
function toSongCard(songInfo) {
  return {
    pyongs: songInfo.pyongs_count,
    title: songInfo.title_with_featured,
    artist: songInfo.artist_names,
    date: songInfo.release_date || songInfo.release_date_for_display,
    imgUrl: songInfo.song_art_image_url,
  };
}

function getRandomSong() {
  return getSearchSong();
}

function getRandomSearchTerm() {
  let vowels = "aoueiy";
  let consonants = "dcdfghjklmnpqrstvwxz";
  //first letter
  let i = Math.floor(Math.random() * consonants.length);
  if (i == consonants.length) {
    //The risk that this will happen is extreamly low
    i--;
  }
  //second letter
  let j = Math.floor(Math.random() * vowels.length);
  if (j == vowels.length) {
    j--;
  }

  return consonants[i] + vowels[j];
}

function getSearchSong() {
  let searchTerm = getRandomSearchTerm();

  return axios.request(getSearchOptions(searchTerm)).then((resp) => {
    let arr = resp.data.response.hits;
    arr = arr.filter(
      (song) => song.result.release_date || song.result.release_date_for_display
    );
    let randomIndex = Math.floor(Math.random() * (arr.length - 1));
    return toSongCard(arr[randomIndex].result);
  });
}

export { getRandomSong };
