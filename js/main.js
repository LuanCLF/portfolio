
async function getRepositories() {
  const response = await fetch("https://api.github.com/users/LuanCLF/repos");
  const data = await response.json();
  console.log(data);
  const repos = data.filter((repo) => repo.stargazers_count > 0);
  setRepos(repos.length - 1);
  return repos;
}

