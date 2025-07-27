import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { gallery, loader, loadMore } from "./refs";


// Инициализация SimpleLightbox
export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

// Рендер галереи
export function createGallery(images) {
  const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
      </a> 
      <ul class="gallery-item-prop">
        <li class="gallery-item-likes"><p><span>Likes</span><p>${likes}</p></li>
        <li class="gallery-item-views"><p><span>Views</span><p>${views}</p></li>
        <li class="gallery-item-comments"><p><span>Comments</span><p>${comments}</p></li>
        <li class="gallery-item-downloads"><p><span>Downloads</span><p>${downloads}</p></li>
      </ul>
    </li>
  `).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

// Очистка галереи
export function clearGallery() {
  gallery.innerHTML = '';
}

// Запуск лодыря
export function showLoader() {
  loader.style.display = "inline-block";
}

// Останов лодыря
export function hideLoader() {
  loader.style.display = "none";
}

// Показать кнопку Load more
export function showLoadMoreButton() {
loadMore.style.display = "block"
}

// Скрыть кнопку Load more
export function hideLoadMoreButton() {
    loadMore.style.display = "none"
}