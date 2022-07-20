const getRandomInteger = (min, max) => {
  const minIsPositive = min >= 0;
  const maxIsPositive = max >= 0;

  if (!(minIsPositive && maxIsPositive)) {
    throw new Error('Диапазон может быть только положительный, включая ноль');
  }
  if (min >= max || min === max) {
    throw new Error('Значение «до» меньшее, чем значение «от», или равное ему');
  }

  return Math.floor(Math.random() * (max - min) + min);
};
getRandomInteger(0, 7);

const getRandomFloat = (min, max, fixNumberSigns = 2) => {
  const minIsPositive = min >= 0;
  const maxIsPositive = max >= 0;

  if (!(minIsPositive && maxIsPositive)) {
    throw new Error('Диапазон может быть только положительный, включая ноль');
  }
  if (min >= max || min === max) {
    throw new Error('Значение «до» меньшее, чем значение «от», или равное ему');
  }
  return +(Math.random() * (max - min) + min).toFixed(fixNumberSigns);
};

getRandomFloat(1.1, 1.5, 2);

const OFFERS_LENGTH = 10;
const OFFER_TITLE = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде',
];
const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const OFFER_TIMES = ['12:00', '13:00', '14:00'];
const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const getRandomArrayItem = (array) => array[getRandomInteger(0, array.length)];
const mixArray = (array) => {
  const newArr = [...array];

  for (let i = newArr.length - 1; i > 0; i--) {
    const num = Math.floor(Math.random() * (i + 1));
    const buffer = newArr[num];
    newArr[num] = newArr[i];
    newArr[i] = buffer;
  }

  return newArr;
};
const getArrayRandomLength = function (array) {
  const newArray = [...array];

  return mixArray(newArray).slice(0, getRandomInteger(1, newArray.length - 1));
};
const generateOffer = (i) => {
  const locationLat = getRandomFloat(35.65, 35.7, 5);
  const locationLng = getRandomFloat(139.7, 139.8, 5);

  return {
    author: {
      avatar: `img/avatars/user${String(i).padStart(2, 0)}.png`,
    },
    offer: {
      title: getRandomArrayItem(OFFER_TITLE),
      address: `${locationLat}, ${locationLng}`,
      price: getRandomInteger(1, 10000),
      type: getRandomArrayItem(OFFER_TYPES),
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 5),
      checkin: getRandomArrayItem(OFFER_TIMES),
      checkout: getRandomArrayItem(OFFER_TIMES),
      features: getArrayRandomLength(OFFER_FEATURES),
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, porro.',
      photos: getArrayRandomLength(OFFER_PHOTOS),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
};

const generateData = (offersLength) =>
  Array.from({ length: offersLength }).map((el, i) => generateOffer(i));
generateData(OFFERS_LENGTH);

class Random {
  static int(min, max) {
    const minIsPositive = min >= 0;
    const maxIsPositive = max >= 0;

    if (!(minIsPositive && maxIsPositive)) {
      throw new Error('Диапазон может быть только положительный, включая ноль');
    }
    if (min >= max || min === max) {
      throw new Error('Значение «до» меньшее, чем значение «от», или равное ему');
    }

    return Math.floor(Math.random() * (max - min) + min);
  }

  static float(min, max, fixNumberSigns = 2) {
    const minIsPositive = min >= 0;
    const maxIsPositive = max >= 0;

    if (!(minIsPositive && maxIsPositive)) {
      throw new Error('Диапазон может быть только положительный, включая ноль');
    }
    if (min >= max || min === max) {
      throw new Error('Значение «до» меньшее, чем значение «от», или равное ему');
    }
    return +(Math.random() * (max - min) + min).toFixed(fixNumberSigns);
  }

  static itemFromArray(array) {
    return array[Random.int(0, array.length - 1)];
  }
}
Random.int(0, 10);
// console.log(Random.int(5, 10));
// console.log(Random.float(1.1, 1.5));
// console.log(Random.itemFromArray(['test', 'test2', 'test3', 1, 2, 3]));

class ArrayEnhanced extends Array {
  array = this;
  // встроенные методы массива будут использовать этот метод как конструктор
  static get [Symbol.species]() {
    return Array;
  }

  shuffle() {
    const newArr = [...this.array];

    for (let i = newArr.length - 1; i > 0; i--) {
      const num = Math.floor(Math.random() * (i + 1));
      const buffer = newArr[num];
      newArr[num] = newArr[i];
      newArr[i] = buffer;
    }

    return newArr;
  }

  randomLength() {
    const newArray = [...this.array];

    return this.shuffle(newArray).slice(0, getRandomInteger(1, newArray.length - 1));
  }
}
const a = new ArrayEnhanced(1, 2, 3, 'str', 'bar');
a.shuffle();
a.randomLength();
// console.log(a instanceof ArrayEnhanced);
// console.log(a instanceof Array);
// a.map((e) => e); // [1, 2, 3]
a.push('foo');
a.push(777);
console.log(a);
console.log(a.shuffle());
console.log(a.randomLength());
console.log(a.map((e) => e)); // [1, 2, 3]);
// console.log(a);
