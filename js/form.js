import { isEscapeKey } from './utils.js';

const uploadForm = document.querySelector('#upload-select-image');
const uploadFileInput = uploadForm.querySelector('#upload-file');
const uploadFilePreview = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('#upload-cancel');
const hashtagsInput = uploadForm.querySelector('[name="hashtags"]');
const descriptionInput = uploadForm.querySelector('[name="description"]');

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

function setUploadFormListeners() {
  uploadFileInput.addEventListener('change', () => {
    uploadFilePreview.classList.remove('hidden');
    document.body.classList.add('modal-open');

    closeButton.addEventListener('click', closeUploadFilePreview);
    document.addEventListener('keydown', escKeydownHandler);
  });

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    // const isValid = pristine.validate();
  });

  descriptionInput.addEventListener('focus', () => {
    document.removeEventListener('keydown', escKeydownHandler);
    descriptionInput.addEventListener('focusout', () => document.addEventListener('keydown', escKeydownHandler));
  });

  hashtagsInput.addEventListener('focus', () => {
    document.removeEventListener('keydown', escKeydownHandler);
    hashtagsInput.addEventListener('focusout', () => document.addEventListener('keydown', escKeydownHandler));
  });
}

function setUploadFormValidators() {
  pristine.addValidator(hashtagsInput, validateHashtags, getHashtagsErrorMessage);
}

function closeUploadFilePreview() {
  uploadFilePreview.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();

  closeButton.removeEventListener('click', closeUploadFilePreview);
  document.removeEventListener('keydown', escKeydownHandler);
}

function escKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadFilePreview();
  }
}

function validateHashtags(value) {
  if (!value) {
    return true;
  }

  const hashtagReg = /^#[a-zа-яё0-9]{1,19}$/i;
  const hashtags = value.trim().toLowerCase().split(' ');

  if (hashtags.length > 5) {
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

export { setUploadFormListeners as setFormListeners, setUploadFormValidators as setFormValidators };
