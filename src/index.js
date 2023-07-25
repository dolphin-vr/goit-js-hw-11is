import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { serviceGetImages } from './api';
import { createMarkup } from './markup';

// const API_KEY = '38368366-a7227dffd937457d386778604';
const configAx = {
  method: 'get',
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '38368366-a7227dffd937457d386778604',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  },
};

const optNotiflx = {
  width: '380px',
  timeout: 5000,
  fontSize: '18px',
};

const optsSimplBox = {
  captionsData: 'alt',
  captionDelay: 250,
};
const lightbox = new SimpleLightbox('.gallery a', optsSimplBox);

let page = 1;

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  btnMore: document.querySelector('.more'),
  pgnum: document.querySelector('.pgnum'),
};

refs.form.addEventListener('submit', goSearch);
refs.btnMore.addEventListener('click', goMore);

async function goSearch(ev) {
  ev.preventDefault();
  window.scrollTo(0, 0);
  page = 1;
  const searchString = refs.form.searchQuery.value.split(' ').join('+');
  const images = await serviceGetImages(searchString);
  if (images.total == 0) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.', optNotiflx);
  }
  if (images.totalHits > configAx.params.per_page) {
    refs.btnMore.style.display = 'block';
  }
  refs.gallery.innerHTML = await createMarkup(images.hits);
  lightbox.refresh();

  refs.pgnum.textContent = `Page ${page}`;

  // const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();

  // window.scrollBy({
  // top: cardHeight * 2,
  // behavior: "smooth",
  // });
}

async function goMore() {
  const searchString = refs.form.searchQuery.value.split(' ').join('+');
  page += 1;
  const images = await serviceGetImages(searchString, page);
  refs.gallery.insertAdjacentHTML('beforeend', await createMarkup(images.hits));
  lightbox.refresh();
  refs.pgnum.textContent = `Page ${page}`;
  if (page >= 13) {
    console.log('page= ', page);
    refs.btnMore.style.display = 'none';
    Notify.info("We're sorry, but you've reached the end of search results.", optNotiflx);
  }
}

export { configAx };
