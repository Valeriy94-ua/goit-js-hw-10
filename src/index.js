import { fetchBreeds, fetchBreedsById } from './cat-api.js';
import Notiflix from 'notiflix';

// 3rd var
const refs = {
  breedSelect: document.querySelector('.breed-select'),
  input: document.querySelector('select'),
  loader: document.querySelector('.loader'),
  catInfoContainer: document.querySelector('.cat-info'),
  error: document.querySelector('.error'),
};

hideMessageError();
refs.breedSelect.style.display = 'none';
// refs.error.style.display = 'none';
loaderOn();
// hideLoader();

fetchBreeds()
  .then(data => {
    hideLoader();

    data.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      refs.breedSelect.appendChild(option);
    });
    refs.breedSelect.style.display = 'block';
    hideLoader();
  })
  .catch(error => {
    hideLoader();
    failureMessage(error);
  });

function onInputClick(event) {
  refs.catInfoContainer.style.display = 'none';
  loaderOn();
  hideMessageError();

  // refs.loader.classList.toggle('invisible');
  // refs.catInfoContainer.classList.toggle('invisible');

  const breedId = event.target.value;
  fetchBreedsById(breedId)
    .then(data => {
      // // Створення елементів для зображення та інформації
      const catImage = document.createElement('img');
      const catName = document.createElement('h1');
      const catDescription = document.createElement('h3');
      const catTemperament = document.createElement('h3');

      // // Встановлення значень для зображення та інформації з відповіді сервера
      catImage.src = data[0].url;
      catName.textContent = data[0].breeds[0].name;
      catDescription.textContent = `Description: ${data[0].breeds[0].description}`;
      catTemperament.textContent = `Temperament: ${data[0].breeds[0].temperament}`;

      // // Додавання створених елементів до контейнера
      refs.catInfoContainer.innerHTML = '';
      refs.catInfoContainer.appendChild(catImage);
      refs.catInfoContainer.appendChild(catName);
      refs.catInfoContainer.appendChild(catDescription);
      refs.catInfoContainer.appendChild(catTemperament);

      refs.catInfoContainer.style.display = 'block';
      hideLoader();
    })
    // .finally(() => {
    //   refs.loader.classList.toggle('invisible');
    //   refs.catInfoContainer.classList.toggle('invisible');

    .catch(error => {
      hideLoader();
      failureMessage(error);
    });
}

refs.input.addEventListener('change', onInputClick);

function loaderOn() {
  refs.loader.style.display = 'block';
}

function hideMessageError() {
  refs.error.style.display = 'none';
}

function failureMessage() {
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
  refs.error.style.display = 'block';
}

function hideLoader() {
  refs.loader.style.display = 'none';
}
