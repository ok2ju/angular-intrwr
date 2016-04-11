function EditCompanyController(companyResource, $scope,
                          toastr, $state, $uibModal, config,
                          $stateParams, countries, categories, imageService, Vendor) {
  const {moment} = Vendor;
  const vm = this;

  vm.company = {};
  vm.updateCompany = updateCompany;
  vm.getImageUrl = getImageUrl;

  // Fetching data for countries dropdown
  vm.countries = countries.data;

  // Fetching data for categories dropdown
  vm.categories = categories.data;

  companyResource.one($stateParams.id).then(function(company) {
    company.creation_date = moment(company.creation_date).toDate();
    vm.company = company;
  });

  // Datepicker options
  /*vm.today = function() {
    vm.company.yof = new Date();
  };
  vm.today();*/

  vm.maxDate = new Date(2020, 5, 22);

  vm.openDatepicker = function($event) {
    vm.status.opened = true;
  };

  vm.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  vm.format = vm.formats[0];

  vm.status = {
    opened: false
  };

  function getImageUrl() {
    return imageService.getCompanyImageUrl(vm.company);
  }

  function updateCompany() {
    vm.company.put().then(function() {
      $state.go('app.manageCompany');
      toastr.success('Company settings was successfully updated.', 'Yay!');
    }, function(err) {
        toastr.error('Error while updating.', 'Error!');
    });
  }

  // Open modal when delete company
  vm.openModal = () => {
    $uibModal.open({
      animation: true,
      templateUrl: `${config.ROOT_DIR}/src/components/company/edit/modal.tpl.html`,
      controller: 'CompanyEditModalController',
      controllerAs: 'vm',
      resolve: {
        companyId() {
          return vm.company._id;
        }
      }
    });
  };

  // Open modal with company logo
  vm.onFileSelected = function() {
    if(vm.file) {
      vm.opePhotonModal();
    }
  };

  vm.openFileDialog = function() {
    $('#up-photo').click();
  };

  vm.opePhotonModal = (size) => {
    $uibModal.open({
      animation: true,
      templateUrl: `${config.ROOT_DIR}/src/components/company/edit/photo-modal.tpl.html`,
      controller: 'CompanyPhotoModalController',
      controllerAs: 'vm',
      size: size,
      resolve: {
        file() {
          return vm.file;
        },
        company() {
          return vm.company;
        }
      }
    });
  };

}

export default EditCompanyController;
