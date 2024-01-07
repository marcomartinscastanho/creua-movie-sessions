# CREUA Movie Sessions

React web application to randomly select a movie director from a list.

## Give it a try

The web app is running live here: [https://creua-movie-sessions.netlify.app/](https://creua-movie-sessions.netlify.app/)

## How it works

- The list of directors is fetched from a Google spreadsheed
- The history of previously selected directors is stored in Firebase
- The app randomly selects a director from the list, excluding directors from the same country as the last director selected
- Details and filmography of the selected director are fetched from [TMDB API](https://developer.themoviedb.org/docs/getting-started)
