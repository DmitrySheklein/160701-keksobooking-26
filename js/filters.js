import { debounce } from './util.js';
import { markerGroup, renderPoints } from './map.js';

const filtersDefaultsConfig = {
  'housing-type': 'any',
  'housing-price': 'any',
  'housing-rooms': 'any',
  'housing-guests': 'any',
  'filter-wifi': false,
  'filter-dishwasher': false,
  'filter-parking': false,
  'filter-washer': false,
  'filter-elevator': false,
  'filter-conditioner': false,
};

const filterHousingPrice = (type, price) => {
  const MIDDLE_PRICE = 10000;
  const MAX_PRICE = 50000;
  let priceVal = false;

  switch (type) {
    case 'any':
      priceVal = true;
      break;
    case 'low':
      priceVal = price <= MIDDLE_PRICE;
      break;
    case 'middle':
      priceVal = price >= MIDDLE_PRICE && price <= MAX_PRICE;
      break;
    case 'high':
      priceVal = price >= MAX_PRICE;
      break;
    default:
      break;
  }
  if (priceVal) {
    return price;
  }
  return false;
};

const filterOffers = (offers) => {
  const mapFilters = document.querySelector('.map__filters');

  const filtering = (objConfig, arr) => {
    let newArr = arr.slice();

    for (const key in objConfig) {
      if (objConfig[key] !== false && objConfig[key] !== 'any') {
        const [type, filterName] = key.split('-');
        const isFilter = type === 'filter';

        newArr = newArr.filter(({ offer }) => {
          if (filterName === 'price') {
            const isGoodPrice = filterHousingPrice(objConfig[key], offer.price);

            return offer[filterName] === isGoodPrice;
          } else if (isFilter) {
            return !!offer.features && offer.features.includes(filterName);
          } else {
            const isHouseType = filterName === 'type';
            const configValue = !isHouseType
              ? Number(objConfig[key])
              : objConfig[key];

            return offer[filterName] === configValue;
          }
        });
      }
    }

    return newArr;
  };

  const onMapFiltersChange = ({ target }) => {
    const value = target.value;
    const id = target.id;
    const isCheckbox = target.type === 'checkbox';

    filtersDefaultsConfig[id] = isCheckbox ? target.checked : value;

    markerGroup.clearLayers();
    const sortData = filtering(filtersDefaultsConfig, offers);
    renderPoints(sortData);
  };

  mapFilters.addEventListener('change', debounce(onMapFiltersChange));
};

export { filterOffers };
