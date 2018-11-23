// use github secrets to ignore rate limit
const id = '';
const sec = '';
const params = `?client_id=${id}&client_secret=${sec}`;

async function getProfile (username) {
  const response = await fetch(`https://api.github.com/users/${username}${params}`)
    .catch(handleError);

  return response.json();
}

async function getRepos (username) {
  const response = await fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
    .catch(handleError);
  return response.json();
}

function getStarCount (repos) {
  return repos.reduce((count, { stargazers_count }) => count + stargazers_count, 0);
}

function calculateScore ({ followers, public_repos, public_gists }, repos) {
  return Math.floor((followers * 3) + getStarCount(repos) + (public_repos * 0.3) + (public_gists * 0.15));
}

function handleError (error) {
  console.warn(error);
  return null;
}

async function getUserData (player) {
  const [ profile, repos ] = await Promise.all([
    getProfile(player),
    getRepos(player)
  ]);

  return {
    profile,
    score: calculateScore(profile, repos)
  };
}

function sortPlayers (players) {
  return players.sort((a,b) => b.score - a.score);
}

export async function battle (players) {
  const results = await Promise.all(players.map(getUserData))
    .catch(handleError);

  return results === null
    ? results
    : sortPlayers(results);
}

export async function fetchPopularRepos (language) {
  const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

  const response = await fetch(encodedURI)
    .catch(handleError);

  const repos = await response.json()
    .catch(handleError);

  return repos.items
}
