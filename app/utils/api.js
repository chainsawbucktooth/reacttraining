var axios = require('axios');

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var params = "?client_id=" + id + "&client_secret=" + sec;

function getProfile (username) {
  return axios.get('https://api.github.com/users/' + username)
    .then(function(user){
      return user.data;
    });
}

function getRepos(username) {
  console.log("repos acquired")
  return axios.get(axios.get('https://api.github.com/users/' + username + '/repos'))
}

function getStarCount(repos) {
  console.log("star count obtained")
  return repos.data.reduce(function(count, repo){
    return count + repo.stargazers_count;
  }, 0);
}

function calculateScore(profile, repos) {
  console.log("score calcumulated")
  var followers = profile.followers;
  var totalStars = getStarCount(repos);
  return (followers * 3) + totalStars;
}

function handleError(error) {
  console.log("error thrown overboard")
  console.warn(error);
  return null;
}

function getUserData(player) {
  console.log("user data has been purloined and sold to highest bidder")
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then(function(data) {
     var profile = data[0];
     var repos = data[1];

     return {
       profile: profile,
       score: calculateScore(profile, repos)
     }
  })
}

function sortPlayers(players) {
  console.log("players sorted by the Sorting Hat")
  return players.sort(function(a, b){
    return b.score - a.score;
  })
}

module.exports = {
  battle: function(players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError)
  },

  fetchPopularRepos: function(language) {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');

    return axios.get(encodedURI)
     .then(function(response){
         return response.data.items;
     })
  }
}
