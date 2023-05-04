import { createPhotos } from './data.js';
import { renderPictures } from './pictures.js';
import { setFormListeners, setFormValidators } from './form.js';

const pictures = createPhotos();
renderPictures(pictures);
setFormListeners();
setFormValidators();
