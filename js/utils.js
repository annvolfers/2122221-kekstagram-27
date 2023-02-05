function getRandomPositiveInteger(min, max) {
  if (min < 0 || max < 0 || typeof min !== 'number' || typeof max !== 'number') {
    return NaN;
  }

  const lower = Math.ceil(Math.min(min, max));
  const greater = Math.floor(Math.max(min, max));

  return Math.floor(Math.random() * (greater - lower + 1)) + lower;
}

function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

function createIdGenerator() {
  let lastGeneratedId = 0;

  return function () {
    return ++lastGeneratedId;
  };
}

export { getRandomPositiveInteger, checkStringLength, getRandomArrayElement, createIdGenerator };
