const filters = document.querySelector('.img-filters');

function setFiltersClickHandler(cb) {
  filters.classList.remove('img-filters--inactive');

  filters.addEventListener('click', (evt) => {
    if (evt.target.closest('.img-filters__button')) {
      filters
        .querySelector('.img-filters__button--active')
        .classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');

      cb(evt.target.getAttribute('id'));
    }
  });
}

export { setFiltersClickHandler };
