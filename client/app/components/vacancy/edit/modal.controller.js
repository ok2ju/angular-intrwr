module.exports = function VacancyEditModalController($uibModalInstance, $state, toastr, vacancyResource, vacancyId) {
  var vm = this;

  vm.deleteVacancy = deleteVacancy;

  vm.ok = function () {
    vm.deleteVacancy(vacancyId);
  };

  vm.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  function deleteVacancy(id) {
    vacancyResource.delete(id).then(function() {
      vm.cancel();
      $state.go('app.vacanciesManage.companies');
      toastr.success('Vacancy was successfully deleted.', 'Yay!');
    }, function(err) {
        console.log('Error while deleting vacancy!');
    });
  }
};
