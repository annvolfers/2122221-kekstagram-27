import { openBigPicture } from './picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

function renderPictures(pictures) {
  const picturesFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;

    pictureElement.setAttribute('data-picture-id', picture.id);
    picturesFragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(picturesFragment);
  picturesContainer.addEventListener('click', (evt) => {
    if (!evt.target.closest('.picture')) {
      return;
    }

    const pictureId = parseInt(evt.target.closest('.picture').getAttribute('data-picture-id'), 10);
    const pictureToOpen = pictures.find((picture) => picture.id === pictureId);
    openBigPicture(pictureToOpen);
  });
}

export { renderPictures };
