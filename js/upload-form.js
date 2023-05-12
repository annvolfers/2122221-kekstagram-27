import { isEscapeKey } from './utils.js';
import { initScale, resetScale } from './scale.js';
import { resetEffects } from './effects.js';

const uploadForm = document.querySelector('#upload-select-image');
const uploadFileInput = uploadForm.querySelector('#upload-file');
const uploadFilePreview = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('#upload-cancel');
const hashtagsInput = uploadForm.querySelector('[name="hashtags"]');
const descriptionInput = uploadForm.querySelector('[name="description"]');

const MAX_HASHTAGS_COUNT = 5;
const hashtagErrorTypes = {
  'count': 'Максимальное количество хэш-тегов - 5',
  'duplicates': 'Один и тот же хэш-тег не может быть использован дважды',
  'reg': 'Хэш-тег должен начинаться с символа #, может состоять из букв и чисел и не может содержать пробелы, спецсимволы, символы пунктуации, эмодзи и т. д. Максимальная длина одного хэш-тега 20 символов, включая решётку'
};

let hashtagErrorText;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-text-error',
});

function initUploadForm() {
  uploadFileInput.addEventListener('change', () => {
    uploadFilePreview.classList.remove('hidden');
    document.body.classList.add('modal-open');

    initScale();
    closeButton.addEventListener('click', closeUploadFilePreview);
    descriptionInput.addEventListener('focus', descriptionInputFocusHandler);
    hashtagsInput.addEventListener('focus', hashtagsInputFocusHandler);
    uploadForm.addEventListener('submit', uploadFormSubmitHandler);
    document.addEventListener('keydown', escKeydownHandler);
  });

  pristine.addValidator(hashtagsInput, validateHashtags, getHashtagsErrorMessage);
}

function closeUploadFilePreview() {
  uploadFilePreview.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffects();

  closeButton.removeEventListener('click', closeUploadFilePreview);
  descriptionInput.removeEventListener('focus', descriptionInputFocusHandler);
  hashtagsInput.removeEventListener('focus', hashtagsInputFocusHandler);
  uploadForm.removeEventListener('submit', uploadFormSubmitHandler);
  document.removeEventListener('keydown', escKeydownHandler);
}

function escKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadFilePreview();
  }
}

function descriptionInputFocusHandler() {
  document.removeEventListener('keydown', escKeydownHandler);
  descriptionInput.addEventListener('focusout', () => document.addEventListener('keydown', escKeydownHandler));
}

function hashtagsInputFocusHandler() {
  document.removeEventListener('keydown', escKeydownHandler);
  hashtagsInput.addEventListener('focusout', () => document.addEventListener('keydown', escKeydownHandler));
}

function uploadFormSubmitHandler(evt) {
  evt.preventDefault();

  // const isValid = pristine.validate();
}

function validateHashtags(value) {
  if (!value) {
    return true;
  }

  const hashtagReg = /^#[a-zа-яё0-9]{1,19}$/i;
  const hashtags = value.trim().toLowerCase().split(' ');

  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    hashtagErrorText = hashtagErrorTypes['count'];
    return false;
  }

  for (let i = 0; i < hashtags.length - 1; i++) {
    for (let j = i + 1; j < hashtags.length; j++) {
      if (hashtags[i] === hashtags[j]) {
        hashtagErrorText = hashtagErrorTypes['duplicates'];
        return false;
      }
    }
  }

  for (let i = 0; i < hashtags.length; i++) {
    if (!hashtagReg.test(hashtags[i])) {
      hashtagErrorText = hashtagErrorTypes['reg'];
      return false;
    }
  }

  return true;
}

function getHashtagsErrorMessage() {
  return hashtagErrorText;
}

export { initUploadForm };