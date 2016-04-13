function VacancyEditModalController($mdDialog, $state, vacancyResource, vacancyId, notificationService) {
  var vm = this;

  vm.deleteVacancy = deleteVacancy;

  vm.ok = function () {
    vm.deleteVacancy(vacancyId);
  };

  vm.cancel = function () {
    $mdDialog.hide();
  };

  function deleteVacancy(id) {
    vacancyResource.delete(id).then(function() {
      vm.cancel();
      $state.go('app.vacanciesManage.companies');
      notificationService.showNotification('Vacancy was successfully deleted!');
    }, function(err) {
      notificationService.showNotification('Error while deleting vacancy!');
    });
  }
}

export default VacancyEditModalController;
