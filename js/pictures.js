import { openBigPicture } from './picture.js';
import { createRandomIdFromRangeGenerator } from './utils.js';

const RANDOM_PICTURES_COUNT = 10;
let picturesEventListenerSetted = false;

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

function renderPictures(pictures, filter = 'filter-default') {
  picturesContainer.querySelectorAll('.picture').forEach((element) => element.remove());
  const picturesFragment = document.createDocumentFragment();

  if (filter === 'filter-random') {
    const generatePictureId = createRandomIdFromRangeGenerator(0, pictures.length - 1);
    const pictureIdsToRender = [];

    for (let i = 0; i < RANDOM_PICTURES_COUNT; i++) {
      pictureIdsToRender.push(generatePictureId());
    }
    pictures = pictures.filter((_, index) => pictureIdsToRender.includes(index));
  } else if (filter === 'filter-discussed') {
    pictures = pictures.slice().sort(comparePictureCommentsCount);
  }

  pictures.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;

    pictureElement.setAttribute('data-picture-id', picture.id);
    picturesFragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(picturesFragment);
  if (!picturesEventListenerSetted) {
    picturesContainer.addEventListener('click', (evt) => {
      if (!evt.target.closest('.picture')) {
        return;
      }

      const pictureId = parseInt(evt.target.closest('.picture').getAttribute('data-picture-id'), 10);
      const pictureToOpen = pictures.find((picture) => picture.id === pictureId);
      openBigPicture(pictureToOpen);
    });
    picturesEventListenerSetted = true;
  }
}

function comparePictureCommentsCount(pictureA, pictureB) {
  return pictureB.comments.length - pictureA.comments.length;
}

export { renderPictures };
