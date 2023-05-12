const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlInput = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview');

const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_SCALE_VALUE = 100;

let currentScaleValue = DEFAULT_SCALE_VALUE;

function initScale() {
  scaleControlInput.value = `${currentScaleValue}%`;

  scaleControlSmaller.addEventListener('click', scaleControlSmallerClickHandler);
  scaleControlBigger.addEventListener('click', scaleControlBiggerClickHandler);
}

function resetScale() {
  currentScaleValue = DEFAULT_SCALE_VALUE;
  scaleImage(currentScaleValue);

  scaleControlSmaller.removeEventListener('click', scaleControlSmallerClickHandler);
  scaleControlBigger.removeEventListener('click', scaleControlBiggerClickHandler);
}

function scaleControlSmallerClickHandler() {
  if (currentScaleValue <= MIN_SCALE_VALUE) {
    return;
  }

  currentScaleValue -= SCALE_STEP;
  scaleImage(currentScaleValue);
}

function scaleControlBiggerClickHandler() {
  if (currentScaleValue >= MAX_SCALE_VALUE) {
    return;
  }

  currentScaleValue += SCALE_STEP;
  scaleImage(currentScaleValue);
}

function scaleImage(value) {
  scaleControlInput.value = `${value}%`;
  imagePreview.style.transform = `scale(${value / 100})`;
}

export { initScale, resetScale };
