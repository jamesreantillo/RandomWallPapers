const auth = '563492ad6f91700001000001c60fb79a6010403881426e0eeba18eb8';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
const button = document.querySelector('.search-btn');
const more = document.querySelector('.more');
let page = 1;
let fetchLink;
let searchValue;
let currentSearch;

//Event Listener
searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(currentSearch);
});
more.addEventListener('click', loadmore);

function updateInput(e) {
  searchValue = e.target.value;
}

function generatePhotos(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement('div');
    galleryImg.classList.add('gallery-img');
    galleryImg.innerHTML = `
    <div class="gallery-info">
    <p>${photo.photographer}</p> 
    <a href=${photo.src.original} download>Download</a>
    </div>
    <img src=${photo.src.large}></img>
    `;
    gallery.appendChild(galleryImg);
    console.log(photo);
  });
}

function clear() {
  gallery.innerHTML = '';
  searchInput.value = '';
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    headers: {
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

async function curatedPhotos() {
  const fetchLink = 'https://api.pexels.com/v1/curated?per_page=15&page=1';
  const data = await fetchApi(fetchLink);
  generatePhotos(data);
}

async function searchPhotos(query) {
  const fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  clear();
  const data = await fetchApi(fetchLink);
  generatePhotos(data);
}

async function loadmore() {
  page++;
  console.log('page', page);
  if (currentSearch) {
    console.log(currentSearch);
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePhotos(data);
}

curatedPhotos();
