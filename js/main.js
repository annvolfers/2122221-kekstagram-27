import { getData } from './api.js';
import { renderPictures } from './pictures.js';
import { initUploadForm } from './upload-form.js';
import { showAlert } from './message.js';
import { setFiltersClickHandler } from './filters.js';
import { debounce } from './utils.js';

const RERENDER_DELAY = 500;

getData(
  (pictures) => {
    renderPictures(pictures);
    setFiltersClickHandler(
      debounce((filter) => renderPictures(pictures, filter),
        RERENDER_DELAY,
      ));
  },
  () => showAlert('При загрузке данных с сервера произошла ошибка')
);
initUploadForm();
