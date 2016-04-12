function VacancyListController(vacancies, positions) {
  const vm = this;

  vm.vacancies = vacancies;
  vm.positions = positions.data;
  vm.resetFilter = resetFilter;

  // Reset filters query
  function resetFilter() {
    vm.position = {};
    vm.vacancy = {};
  }
}

export default VacancyListController;
