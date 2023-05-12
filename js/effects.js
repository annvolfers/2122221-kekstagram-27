const uploadForm = document.querySelector('#upload-select-image');
const sliderContainer = uploadForm.querySelector('.effect-level');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const sliderInput = sliderContainer.querySelector('.effect-level__value');
const imagePreview = uploadForm.querySelector('.img-upload__preview');

const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
];

const DEFAULT_EFFECT = EFFECTS[0];
let currentEffect = DEFAULT_EFFECT;

function updateSlider() {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    start: currentEffect.max,
    step: currentEffect.step,
  });

  if (currentEffect === DEFAULT_EFFECT) {
    sliderContainer.classList.add('hidden');
  } else {
    sliderContainer.classList.remove('hidden');
  }
}

function sliderUpdateHandler() {
  imagePreview.style.filter = 'none';
  imagePreview.className = 'img-upload__preview';
  sliderInput.value = '';

  if (currentEffect === DEFAULT_EFFECT) {
    return;
  }

  const sliderValue = sliderElement.noUiSlider.get();
  imagePreview.classList.add(`effects__preview--${currentEffect.name}`);
  imagePreview.style.filter = `${currentEffect.style}(${sliderValue}${currentEffect.unit})`;
  sliderInput.value = sliderValue;
}

function uploadFormChangeHandler(evt) {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  currentEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  updateSlider();
}

function resetEffects() {
  currentEffect = DEFAULT_EFFECT;
  updateSlider();
}

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

sliderContainer.classList.add('hidden');
sliderElement.noUiSlider.on('update', sliderUpdateHandler);
uploadForm.addEventListener('change', uploadFormChangeHandler);

export { resetEffects };
