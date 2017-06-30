// Github API'S

import axios from "axios";

const client_id = "YOUR_CLIENT_ID";
const client_secret = "YOUR_CLIENT_SECRET";
const path = "?client_id=" + client_id + "&client_secret=" + client_secret;

// fetch profile
function getProfile(player) {
  return axios.get("https://api.github.com/users/" + player + path)
    .then(function(response) {
      return response.data;
    });
}

// fetch repos
function getRepos(player) {
  return axios.get("https://api.github.com/users/" + player + "/repos" + path +"&per_page=100")
    .then(function(response) {
      return response.data;
    });
}

function getStarCount(repos) {
  return repos.reduce(function(count, repo) {
    return count + repo.stargazers_count;
  }, 0);
}

function calculateScore(profile, repos) {
  return (profile.followers * 3) + getStarCount(repos);
}

function getUserData(player) {
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
  });
}

function sortPlayers(players) {
   return players.sort(function(a, b) {
        return b.score - a.score;
   });
}

function handleError(e) {
  console.warn(e);
  return null;
}

export default {

  battle(players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  },

  fetchPopularRepos(language) {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'
                          + language + '&sort=stars&order=desc&type=Repositories');
    return axios.get(encodedURI)
                .then(response => response.data.items);
  }

}
