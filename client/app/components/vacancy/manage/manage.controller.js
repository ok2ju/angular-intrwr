function VacancyManageController(companies, imageService) {
  const vm = this;

  vm.companies = companies;
  vm.getImageUrl = getImageUrl;

  function getImageUrl(company) {
    return imageService.getImageUrl(company, 'assets/images/companies/default.png');
  }
}

export default VacancyManageController;
