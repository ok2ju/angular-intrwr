import deleteVacancyModalTemplate from './modal.tpl.html';

function VacancyEditController(vacancy, $state, positions, vacancyTypes, notificationService, $mdConstant, vacancyResource, $mdDialog) {

  const vm = this;

  vm.vacancy = vacancy;
  vm.positions = positions.data;
  vm.vacancyTypes = vacancyTypes.data;
  vm.updateVacancy = updateVacancy;

  function updateVacancy() {
    vm.updatedVacancy = {
      company_id: vm.vacancy.company_id,
      description: vm.vacancy.description,
      location: vm.vacancy.location,
      position: vm.vacancy.position.name,
      required_skills: vm.vacancy.required_skills,
      title: vm.vacancy.title,
      type: vm.vacancy.type.name
    };

    vacancyResource.update(vm.vacancy._id, vm.updatedVacancy).then(() => {
      $state.go('app.vacanciesManage.companies');
      notificationService.showNotification('Vacancy settings was successfully updated!');
    });
  }

  // Open modal when delete vacancy
  vm.openDeleteModal = openDeleteModal;

  function openDeleteModal() {
    $mdDialog.show({
      clickOutsideToClose: true,
      locals: { 
        vacancyId: vm.vacancy._id
      },
      template: deleteVacancyModalTemplate,
      controller: 'VacancyEditModalController',
      controllerAs: 'vm'
   });
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

  // Selected Type
  vm.vacancy.type = selectedType();

  function selectedType() {
    let typeString = vacancy.type;
    let formatterTypes = loadTypes();
    let index = _.findIndex(formatterTypes, ['name', typeString]);
    return formatterTypes[index];
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

  // Selected Position
  vm.vacancy.position = selectedPosition();

  function selectedPosition() {
    let positionString = vacancy.position;
    let formatterPositions = loadPositions();
    let index = _.findIndex(formatterPositions, ['name', positionString]);
    return formatterPositions[index];
  }

}

export default VacancyEditController;
