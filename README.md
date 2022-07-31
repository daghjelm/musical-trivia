# Musical Trivia

## Description of your project
It's a timeline musical trivia game in which the players will guess the year a song came out by putting a card with the details of the song on a timeline. 
Think about the board game “När då då” but with songs. The cards will be automatically and randomly generated. You are to put a card on the correct position on the timeline relative to the other cards according to their release date.  

A player can choose to log in and have the state saved, or to just continue as a guest and play without persistence. 

[Link to deployed app](https://musical-trivia-f379e.web.app/#/)

## Project setup

### Install dependencies:
```
npm install
```
### Connect database:

To succesfully run the app locally, you need a file with firebase configurations in src/ called firebaseConfig.js. `src/firebaseConfig.js` 

More info can be found in the firebase documentation [here](https://firebase.google.com/docs/web/learn-more?authuser=0&hl=en#config-object).

### Connect api:
You will also need a file with an api key and base url for the api.
It should look like this:
```
const BASE_URL = 'https://genius.p.rapidapi.com/';
const API_KEY = 'your api key';

export { BASE_URL, API_KEY };
```
It should be put under src/ and called api-config.js
`src/api-config.js`

You can get your own api key at https://rapidapi.com/brianiswu/api/genius/
### Compiles and hot-reloads for development
```
npm run serve
```
this starts a local server on port 8080 

[localhost:8080](localhost:8080)

### Compiles and minifies for production
```
npm run build
```
### Lints and fixes files
```
npm run lint
```