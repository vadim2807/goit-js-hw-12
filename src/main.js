import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';
import { perPage } from './js/config.js';
import { form, input, loadMore } from './js/refs.js';

hideLoadMoreButton();

let page = 0; 
let query = '';

// Обработка формы
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    query = input.value.trim();
    page = 1;

    if (!query) {
        showIziError('Поле пошуку не може бути порожнім');
        return;
    }

    hideLoadMoreButton();
    clearGallery();
    showLoader();
try {
    const data = await getImagesByQuery(query, page, perPage);
        
            hideLoader();
            input.value = ""; // Очищаем поле после успешного запроса
            if (Math.ceil(data.totalHits / perPage) > page) { //Если страница одна - обязательно
                showLoadMoreButton();
            }
            if (data.hits.length === 0) {
                showIziError('Sorry, there are no images matching your search query. Please try again!');
            } else {
                createGallery(data.hits);
            }
        }catch(error){
            hideLoader();
            showIziError('Щось пішло не так... Ми вже працюємо над цією проблемою.');
        };
});

//обработка кнопки ДАЛЕЕ
loadMore.addEventListener("click", async () => {
    hideLoadMoreButton();
    showLoader();
    page++;
    try {
    const data = await getImagesByQuery(query, page, perPage);
        
            hideLoader();
            createGallery(data.hits);
            scroll();
            if (Math.ceil(data.totalHits / perPage) > page) { // Если страница не последняя
                showLoadMoreButton();
            } else {
                showIziEnd("We're sorry, but you've reached the end of search results.")
            }
            
        }catch(error) {
            hideLoader();
            showIziError('Щось пішло не так... Ми вже працюємо над цією проблемою.');
        }
   
})

// Функция для показа ошибок
function showIziError(txt) {
  iziToast.error({
    title: 'Error',
    message: `${txt}`,
    progressBar: false,
    transitionIn: 'fadeIn',
    position: 'topRight',
    animateInside: true,
  });
}

// Функция для показа инфо
function showIziEnd(txt) {
  iziToast.info({
    title: 'End',
    message: `${txt}`,
    progressBar: false,
    transitionIn: 'fadeIn',
    position: 'topRight',
    animateInside: true,
  });
}

// Скроллим - предназначено только для галереи
function scroll() {
  const galleryItem = document.querySelector('.gallery-item');
  const gir = galleryItem.getBoundingClientRect();
  setTimeout(() => {
    window.scrollBy({
      top: gir.height * 2,
      behavior: 'smooth'
    });
  }, 700);
}