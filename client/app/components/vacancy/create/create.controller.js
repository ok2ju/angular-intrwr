function VacancyCreateController($state, vacancyResource, positions, vacancyTypes, companies, notificationService, $mdConstant, Vendor) {

  const vm = this;
  const {_} = Vendor;

  vm.vacancy = {};
  vm.vacancy.required_skills = [];
  vm.company = {};
  vm.registerVacancy = registerVacancy;

  function registerVacancy(isValid) {
    if(isValid) {

      vm.vacancy1 = _.mapValues(vm.vacancy, (o) => {

        return o.name || o;
      });

      vacancyResource.create(vm.vacancy1).then(function() {
        notificationService.showNotification('Vacancy created!');
        $state.go('app.vacanciesList');
      }, function(err) {
        notificationService.showNotification('Error while creating vacancy!');
      });
    }
  }

  // Tags settings
  vm.tagsIsReadOnly = false;
  vm.tagsSeparatorKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
  vm.newTag = newTag;

  function newTag(chip) {
    return {
      text: chip
    };
  }

  // Select component
  vm.vacancyTypes = loadTypes();
  vm.isDisabled = false;
  vm.noCache = true;

  vm.queryTypeSearch = function(query) {
    let results = query ? vm.vacancyTypes.filter( vm.createFilterForTypes(query) ) : vm.vacancyTypes;
    return results;
  };

  vm.createFilterForTypes = function(query) {
    let lowercaseQuery = angular.lowercase(query);
    return function filterFn(state) {
      return (state.value.indexOf(lowercaseQuery) === 0);
    };
  };

  function loadTypes() {
    let typesArray = vacancyTypes.data;
    return typesArray.map((type) => {
      type.value = type.name.toLowerCase();
      return type;
    });
  }

  vm.positions = loadPositions();

  vm.queryPositionSearch = function(query) {
    let results = query ? vm.positions.filter( vm.createFilterForPositions(query) ) : vm.positions;
    return results;
  };

  vm.createFilterForPositions = function(query) {
    let lowercaseQuery = angular.lowercase(query);
    return function filterFn(state) {
      return (state.value.indexOf(lowercaseQuery) === 0);
    };
  };

  function loadPositions() {
    let positionsArray = positions.data;
    return positionsArray.map((position) => {
      position.value = position.name.toLowerCase();
      return position;
    });
  }

  vm.companies = loadCompanies();

  vm.queryCompanySearch = function(query) {
    let results = query ? vm.companies.filter( vm.createFilterForCompanies(query) ) : vm.companies;
    return results;
  };

  vm.createFilterForCompanies = function(query) {
    let lowercaseQuery = angular.lowercase(query);
    return function filterFn(state) {
      return (state.value.indexOf(lowercaseQuery) === 0);
    };
  };

  function loadCompanies() {
    let companiesArray = companies;
    return companiesArray.map((company) => {
      company.value = company.name.toLowerCase();
      return company;
    });
  }
}

export default VacancyCreateController;
