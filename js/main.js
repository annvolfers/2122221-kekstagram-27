import { getData } from './api.js';
import { renderPictures } from './pictures.js';
import { initUploadForm } from './upload-form.js';
import { showAlert } from './message.js';

getData(
  (pictures) => renderPictures(pictures),
  () => showAlert('При загрузке данных с сервера произошла ошибка')
);
initUploadForm();
