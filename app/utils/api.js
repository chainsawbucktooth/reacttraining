var axios = require('axios');

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var params = "?client_id=" + id + "&client_secret=" + sec;

function getProfile (username) {
  return axios.get('https://api.github.com/users/' + username + params)
    .then(function (user) {
      return user.data;
    });
}

function getIMDBProfile (title) {
  return axios.get('https://www.omdbapi.com/?s=' + title + '&type=movie')
    .then(function (movie) {
      return movie.data;
    });
}

function getRepos (username) {
  return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100');
}

function getStarCount (repos) {
  return repos.data.reduce(function (count, repo) {
    return count + repo.stargazers_count
  }, 0);
}

function calculateScore (profile, repos) {
  var followers = profile.followers;
  var totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

function handleError (error) {
  console.warn(error);
  return null;
}

function getUserData (player) {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then(function (data) {
    var profile = data[0];
    var repos = data[1];

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  });
}

function sortPlayers (players) {
  return players.sort(function (a,b) {
    return b.imdbRating - a.imdbRating;
  });
}

function sortMovies (movies) {
  return movies.sort(function (a,b) {
    return b.score - a.score;
  });
}

module.exports = {
  battle: function (players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  },

  moviebattle: function (movies) {
    return axios.all(movies.map(getIMDBProfile))
      .then(sortMovies)
      .catch(handleError);
  },

  getMoviePoster: function (searchterm) {
    return axios.get('https://www.omdbapi.com/?t=' + searchterm + '&type=movie')
      .then(function (movie) {
        return movie.data["Poster"];
      });
  },

  fetchPopularRepos: function (language) {
    var encodedURI = window.encodeURI('https://www.omdbapi.com/?s=' + language + '&type=movie');

    return axios.get(encodedURI)
      .then(function (response) {
        return response.data["Search"];
      });
  }
};
