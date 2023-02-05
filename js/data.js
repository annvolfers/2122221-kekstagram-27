import { getRandomPositiveInteger, getRandomArrayElement, createIdGenerator } from './utils.js';

const DESCRIPTION = [
  'Описание 1',
  'Описание 2',
  'Описание 3',
  'Описание 4',
  'Описание 5',
  'Описание 6',
  'Описание 7',
  'Описание 8',
  'Описание 9',
  'Описание 10',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент ?!',
];

const NAMES = [
  'Артём',
  'Елена',
  'Павел',
  'Ольга',
  'Сергей',
  'Александр',
  'Анна',
  'Алексей',
  'Мария',
  'Вера',
];

const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const MAX_COMMENTS_COUNT = 20;
const PHOTOS_COUNT = 25;

const generatePhotoid = createIdGenerator();

function createComments(commentsCount) {
  const generateCommentid = createIdGenerator();
  const comments = [];

  for (let i = 0; i < commentsCount; i++) {
    const commentId = generateCommentid();

    const messages = [];
    for (let j = 0; j <= getRandomPositiveInteger(0, 1); j++) {
      messages.push(getRandomArrayElement(MESSAGES));
    }
    const message = messages.join(' ');

    const comment = {
      id: commentId,
      avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
      message: message,
      name: getRandomArrayElement(NAMES),
    };

    comments.push(comment);
  }

  return comments;
}

function createPhoto() {
  const photoId = generatePhotoid();

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomPositiveInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments: createComments(getRandomPositiveInteger(0, MAX_COMMENTS_COUNT)),
  };
}

const createPhotos = () => Array.from({ length: PHOTOS_COUNT }, createPhoto);

export { createPhotos };
