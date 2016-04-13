module.exports = function VacancyEditController($state, $stateParams, vacancyResource,
  toastr, positions, vacancyTypes, $uibModal, config) {

  const vm = this;

  vm.vacancy = {};
  vm.updateVacancy = updateVacancy;

  // Fetch data for positions dropdown
  vm.positions = positions.data;

  // Fetch data for vacancy types dropdown
  vm.vacancyTypes = vacancyTypes.data;

  vacancyResource.one($stateParams.id).then(function(vacancy) {
    vm.vacancy = vacancy;
  });

  function updateVacancy() {
    vm.vacancy.put().then(function() {
      $state.go('app.vacanciesManage.companies');
      toastr.success('Company settings was successfully updated.', 'Yay!');
    });
  }

  // Open modal when delete company
  vm.openModal = () => {
    $uibModal.open({
      animation: true,
      templateUrl: `${config.ROOT_DIR}/src/components/vacancy/edit/modal.tpl.html`,
      controller: 'VacancyEditModalController',
      controllerAs: 'vm',
      resolve: {
        vacancyId() {
          return vm.vacancy._id;
        }
      }
    });
  }

};
