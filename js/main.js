const prev = document.getElementById("prevRepos");
const next = document.getElementById("nextRepos");

prev.addEventListener("click", prevRepos);
next.addEventListener("click", nextRepos);

document.getElementById("menu-burger").addEventListener("click", function () {
  const navList = document.getElementById("nav-list");
  if (navList.style.display === "none") {
    navList.style.display = "block";
  } else {
    navList.style.display = "none";
  }
});

function setRepos(amount) {
  sessionStorage.setItem("repos", amount);
}
function getRepos() {
  return parseInt(sessionStorage.getItem("repos"));
}

function setPage(amount) {
  sessionStorage.setItem("page", amount);
}
function getPage() {
  return parseInt(sessionStorage.getItem("page")) || 0;
}

function nextRepos(event) {
  event.preventDefault();
  const length = getRepos();
  const page = getPage() + 2 <= length ? getPage() + 2 : 0;
  setPage(page);
  renderRepositories(page);
}

function prevRepos(event) {
  event.preventDefault();
  const length = getRepos();
  const page = getPage() - 2 >= 0 ? getPage() - 2 : length-1;
  setPage(page);
  renderRepositories(page);
}

async function getRepositories() {
  const response = await fetch("https://api.github.com/users/LuanCLF/repos");
  const data = await response.json();
  const repos = data.filter((repo) => repo.stargazers_count > 0);
  setRepos(repos.length - 1);
  return repos;
}

async function renderRepositories(page) {
  const repos = await getRepositories();

  const projectsSection = document.getElementById("projects");
  projectsSection.innerHTML = "";

  for (let i = page; i < page + 2; i++) {
    const repo = repos[i];
    if (repo) {

      const article = document.createElement("article");
      article.classList.add("project");

      const h1 = document.createElement("h1");
      h1.textContent = repo.name;
      article.appendChild(h1);

      const p = document.createElement("p");
      p.textContent = repo.description || "Sem descrição disponível";
      article.appendChild(p);

      const button = document.createElement("button");
      button.classList.add("button");

      const a = document.createElement("a");
      a.href = repo.html_url;
      a.textContent = "Código";
      button.appendChild(a);

      article.appendChild(button);

      projectsSection.appendChild(article);
    }
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  await renderRepositories(0);
});
