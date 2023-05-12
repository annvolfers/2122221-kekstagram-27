import { createPhotos } from './data.js';
import { renderPictures } from './pictures.js';
import { initUploadForm } from './upload-form.js';

const pictures = createPhotos();
renderPictures(pictures);
initUploadForm();
