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

    picturesFragment.appendChild(pictureElement);

    pictureElement.addEventListener('click', () => openBigPicture(picture));
  });

  picturesContainer.appendChild(picturesFragment);
}

export { renderPictures };
