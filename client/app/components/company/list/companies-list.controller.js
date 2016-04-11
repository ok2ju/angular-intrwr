function CompaniesListController(countries, categories, companies) {
  const vm = this;

  vm.countries = countries.data;
  vm.categories = categories.data;
  vm.companies = companies;
  vm.resetFilter = resetFilter;

  // Reset filters query
  function resetFilter() {
    vm.category = {};
    vm.company = {};
    vm.country = {};
  }
}

export default CompaniesListController;
