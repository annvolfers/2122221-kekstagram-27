import { isEscapeKey } from './utils.js';

const bigPictureContainer = document.querySelector('.big-picture');
const closeButton = bigPictureContainer.querySelector('.big-picture__cancel');
const image = bigPictureContainer.querySelector('.big-picture__img img');
const likesCount = bigPictureContainer.querySelector('.likes-count');
const commentsCount = bigPictureContainer.querySelector('.comments-count');
const commentsList = bigPictureContainer.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const socialCaption = bigPictureContainer.querySelector('.social__caption');

function openBigPicture(picture) {
  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  renderPicture(picture);

  closeButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', escKeydownHandler);
}

function closeBigPicture() {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', escKeydownHandler);
}

function escKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function renderPicture(picture) {
  image.src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  socialCaption.textContent = picture.description;
  renderComments(picture.comments);
}

function renderComments(comments) {
  commentsList.innerHTML = '';

  comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentsList.appendChild(commentElement);
  });
}

export { openBigPicture };
