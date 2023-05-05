import { isEscapeKey } from './utils.js';

const COMMENTS_COUNT_TO_UPLOAD = 5;

const bigPictureContainer = document.querySelector('.big-picture');
const closeButton = bigPictureContainer.querySelector('.big-picture__cancel');
const image = bigPictureContainer.querySelector('.big-picture__img img');
const likesCount = bigPictureContainer.querySelector('.likes-count');
const commentsShownElement = bigPictureContainer.querySelector('.comments-shown');
const commentsCountElement = bigPictureContainer.querySelector('.comments-count');
const commentsList = bigPictureContainer.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const commentsLoader = bigPictureContainer.querySelector('.social__comments-loader');
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

  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', loadMoreComments);

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
  commentsCountElement.textContent = picture.comments.length;
  socialCaption.textContent = picture.description;

  renderComments(picture.comments);

  if (picture.comments.length <= COMMENTS_COUNT_TO_UPLOAD) {
    commentsShownElement.textContent = picture.comments.length;
    commentsLoader.classList.add('hidden');
  } else {
    commentsShownElement.textContent = COMMENTS_COUNT_TO_UPLOAD;

    Array.from(commentsList.children).slice(COMMENTS_COUNT_TO_UPLOAD).forEach((comment) => {
      comment.classList.add('hidden');
    });

    commentsLoader.addEventListener('click', loadMoreComments);
  }
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

function loadMoreComments() {
  const hiddenComments = Array.from(commentsList.querySelectorAll('.social__comment.hidden'));

  let newShownComments = 0;
  hiddenComments.slice(0, COMMENTS_COUNT_TO_UPLOAD).forEach((hiddenComment) => {
    hiddenComment.classList.remove('hidden');
    newShownComments++;
  });
  commentsShownElement.textContent = parseInt(commentsShownElement.textContent, 10) + newShownComments;

  if (hiddenComments.length <= COMMENTS_COUNT_TO_UPLOAD) {
    commentsLoader.classList.add('hidden');
  }
}

export { openBigPicture };
