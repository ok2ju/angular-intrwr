function MetaResource(Vendor) {
  const {R} = Vendor;

  function getCountries() {
    return R.one('meta', 'countries').get();
  }

  function getCategories() {
    return R.one('meta', 'categories').get();
  }

  function getVacancyPosition() {
    return R.one('meta', 'position').get();
  }

  function getVacancyType() {
    return R.one('meta', 'vacancyType').get();
  }

  return {
    getCountries,
    getCategories,
    getVacancyPosition,
    getVacancyType
  };
}

export default MetaResource;
