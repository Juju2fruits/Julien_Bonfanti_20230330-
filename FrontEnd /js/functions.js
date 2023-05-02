const baseUrl = "http://localhost:5678/api";

/**
 * Récupérer dynamiquement les données des travaux via l’API
 */
async function findProjects() {
    try {
        let response = await fetch(`${baseUrl}/works`);
        return await response.json();
      } catch (e) {
        console.log(e);
      }
}

/**
 * construit le code html d'un projet de la page principal
 * @param {*} project 
 * @returns 
 */
function buildProjectToHtml(project) {
    let figure = document.createElement("figure");
    figure.classList.add("project");
    figure.setAttribute("data-category", project.category.id);

    let img = document.createElement("img");
    img.setAttribute("src", project.imageUrl);
    img.setAttribute("alt", project.title);

    let figcaption = document.createElement("figcaption");
    figcaption.textContent = project.title;

    figure.append(img, figcaption);

    return figure;
}

function buildModalProjectHtml(project, first) { 
    //toi meme tu dois faire ça, trnasformer en élément HTML
    return `
          <figure class="modal-project" data-category="${project.category.id}">
              <img src="${project.imageUrl}" alt="${project.title}">
              <figcaption>éditer</figcaption>
              ${first ? '<i class="fa fa-bag"></i>' : ''}
              <i class="fa fa-delete"></i>
          </figure>
      `;
  }
  

/**
 * Récupérer dynamiquement les données des catégories via l’API
 */
async function findCategories() {
  try {
    let response = await fetch(`${baseUrl}/categories`);
    let categories = await response.json();
    let categoryALL = {
        id: 0,
        name: "Tous"
    }
    categories.unshift(categoryALL);

    return categories;
  } catch (e) {
    console.log(e);
  }
}

/**
 * Construit le code html d'une category passée en paramètre
 * @param {*} category  (object javascript représentant une catégorie)
 * @returns HTMLElement
 */
function buildCategoryHtml(category) {
    let span = document.createElement("span");
    span.classList.add("category");

    if(category.id === 0) {
        span.classList.add("active");
    }

    span.setAttribute("data-id", category.id);
    span.textContent = category.name;
    return span;
}

function changeActiveClassOnCategories(targetCategoryNode) {
    let categoryNodes = document.querySelectorAll(".category");
    categoryNodes.forEach(categoryNode => {
        categoryNode.classList.remove("active");
    });
    targetCategoryNode.classList.add("active");
}

/**
 * fonction qui prend en parametres l'ensemble de tous les projects et retourne uniquement ceux appartenant à une catégorie
 * @param {*} projects 
 * @param {*} categoryId 
 * @returns 
 */
function filterProjectByCategory(projects, categoryId) {
    if(categoryId === 0) return projects;
    return projects.filter(project => project.category.id === categoryId);
}

/**
 * réinitialise les projects dans la page principale et sa reconstruit
 */
function buildHtmlProjects(projects) {
    let galleryNode = document.querySelector(".gallery");
    galleryNode.innerHTML = "";
    projects.forEach(project => {
        let projetHtml = buildProjectToHtml(project);
        galleryNode.append(projetHtml);
    })
}

async function login(email, password) {
    try{

    }
    catch(error) {
        console.log(error);
        return null;
    }
}

function saveAuth(auth) {
    localStorage.setItem("userId", auth.userId);
    localStorage.setItem("token", auth.token);
}

function logout() {
    localStorage.clear();
}

function getToken() {
    localStorage.getItem("token");
}

function isAuth() {
    return localStorage.getItem("token") ? true : false;
}

async function main() {
    let projects = await findProjects();
    buildHtmlProjects(projects);

    let categories = await findCategories();
    let categoriesNode = document.querySelector(".categories");
    categories.forEach(category => {
        let categoryNode = buildCategoryHtml(category);
        categoriesNode.append(categoryNode);
        categoryNode.addEventListener("click", function(e){        
            changeActiveClassOnCategories(this);
            let filteredProjects = filterProjectByCategory(projects, category.id);
            buildHtmlProjects(filteredProjects);
        })
    })

    let auth = login("lsslls", "ilslsl");
    if(auth){
        localStorage.setItem("")
    }
}

main();