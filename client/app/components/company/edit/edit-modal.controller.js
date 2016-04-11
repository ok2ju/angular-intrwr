function EditCompanyModalController($mdDialog, $state, companyResource, companyId, notificationService) {
  var vm = this;

  vm.ok = ok;
  vm.cancel = cancel;
  vm.deleteCompany = deleteCompany;

  function ok() {
    vm.deleteCompany(companyId);
  }

  function cancel() {
    $mdDialog.hide();
  }

  function deleteCompany(id) {
    companyResource.delete(id).then(function() {
      vm.cancel();
      $state.go('app.manageCompany');
      notificationService.showNotification('Company was successfully deleted!');
    }, function(err) {
      notificationService.showNotification('Error while deleting company!');
    });
  }

}

export default EditCompanyModalController;
