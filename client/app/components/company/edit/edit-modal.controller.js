function EditCompanyModalController($uibModalInstance, $state, toastr, companyResource, companyId) {
  var vm = this;

  vm.deleteCompany = deleteCompany;

  vm.ok = function () {
    vm.deleteCompany(companyId);
  };

  vm.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  function deleteCompany(id) {
    companyResource.delete(id).then(function() {
      vm.cancel();
      $state.go('app.manageCompany');
      toastr.success('Company was successfully deleted.', 'Yay!');
    }, function(err) {
        console.log('Error while deleting company!');
    });
  }

}

export default EditCompanyModalController;
