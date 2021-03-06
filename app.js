const auth = '563492ad6f917000010000013b11ed813284425a9e0d2817c567c4ee';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue;

//Event Listener
searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});

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
    <a href=${photo.src.original}>Download</a>
    </div>
    <img src=${photo.src.large}></img>
    `;
    gallery.appendChild(galleryImg);
  });
}

function clear() {
  gallery.innerHTML = '';
  searchInput.value = '';
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

async function curatedPhotos() {
  const url = 'https://api.pexels.com/v1/curated?per_page=15&page=1';
  const data = await fetchApi(url);
  generatePhotos(data);
}

async function searchPhotos(query) {
  const url = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  clear();
  const data = await fetchApi(url);
  generatePhotos(data);
}

curatedPhotos();
