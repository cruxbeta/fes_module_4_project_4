let isModalOpen = false;
let contrastToggle = false;
let movies;

//      BUTTON MENU

function openMenu() {
  document.body.classList += ` menu--open`;
}
function closeMenu() {
  document.body.classList.remove(`menu--open`);
}

//      DARK THEME TOGGLE

function toggleContrast() {
  contrastToggle = !contrastToggle;
  if (contrastToggle) {
    document.body.classList += ` dark-theme`;
  } else {
    document.body.classList.remove(`dark-theme`);
  }
}

//      MODAL CONTACT POP UP

function contact(event) {
  event.preventDefault();
  const loading = document.querySelector(`.modal__overlay--loading`);
  const success = document.querySelector(`.modal__overlay--success`);
  loading.classList += ` modal__overlay--visible`;
  emailjs
    .sendForm(
      `service_8q49l1e`,
      `template_rf15yco`,
      event.target,
      `Weg1xuw2LnYP_gJTQ`
    )
    .then(() => {
      loading.classList.remove(`modal__overlay--visible`);
      success.classList += ` modal__overlay--visible`;
    })
    .catch(() => {
      loading.classList.remove(`modal__overlay--visible`);
      alert(
        `The email service is temporarily unavailable. Please contact me directly at minisculebeta@gmail.com`
      );
    });
}

function toggleModal() {
    if (isModalOpen) {
        isModalOpen = false;
        return document.body.classList.remove(`modal--open`);
    }
    isModalOpen = true;
    document.body.classList += ` modal--open`;
}

//      API Integration
async function renderMovies(search) {
    const response = await fetch (`http://www.omdbapi.com/?i=tt3896198&apikey=817243eb`);
    const data = await response.json();
    not__loaading.classlist += ` movies__loading`;
    if (!movies) {
        movies = await getMovies();
    }

    not__loading.classList.remove(`movies__loading`);

    const moviesHTML = movies
    .map((result) => {
        return `<div class="result">
              <figure class="result__img--wrapper">
                <img class="result__img" src="${result.Poster}" alt="${result.Title}">
              </figure>
              <div class="result__name">${result.Title}</div>
              <div class="result__grade">${result.Runtime}</div>
              <p class="Approach__para--preview">${result.Plot}</p>
            </div>`;
    })
    .join(``);

    resultsWrapper.innerHTML = moviesHTML;
}
setTimeout(() => {
    renderMovies();
});

renderMovies();