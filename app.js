const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 

document.getElementById('search').addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.key === 'Enter') {
    searchBtn.click();

  }
});

let sliders = [];

// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'image-container col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    // inside the div innerHTML a new feature-3 for searching image hover
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">
    <div class="imagesInfo text">
    <i class="fas fa-thumbs-up"></i>${image.likes}
    <i class=" far fa-star"></i>${image.favorites}
    <i class=" far fa-comment"></i>${image.comments}
    </div>
    `;
    gallery.appendChild(div)
  })
  toggleSpinner()
}

const getImages = (query) => {
  toggleSpinner()
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits))
    .catch(err => console.log(err))

}

const selectItem = (event, img) => {
  let element = event.target;
  element.classList.toggle('added');

  toggleImageRemoveAdd(sliders, img)
}
// Image Toggle function -->Selected Images Remove & Add from slider Array
const toggleImageRemoveAdd = (collection, item) => {
  let index = collection.indexOf(item);
  if (index !== -1) {
    collection.splice(index, 1);
    totalSelectImageFunc()    //select image function
  } else {
    collection.push(item);
    totalSelectImageFunc()    //select image function

  }
}

let slideIndex = 0;
var timer
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';

  const duration = document.getElementById('duration').value;


  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item)
  })
  changeSlide(0)
  timer = setInterval(function () {
    slideIndex++;
    changeSlide(slideIndex);
  }, duration > 0 ? duration : 1000);
}
// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {
  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
})

sliderBtn.addEventListener('click', function () {
  createSlider()
})

// Loading Spinner Function for Searching Result time, that is a new feature-1
const toggleSpinner = () => {
  const spinner = document.getElementById('search-loading-spinner')
  spinner.classList.toggle('d-none')
}

// selected Image Counter Function, that is a new feature-2
const totalSelectImageFunc = () => {
  const totalSelectImage = document.getElementById('total-select-image')
  totalSelectImage.innerText = sliders.length
}

