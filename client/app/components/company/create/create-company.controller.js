function CompanyCreateController(companyResource, $scope,
                            toastr, $state, $uibModal, config, countries, categories, imageService, Vendor) {
  const vm = this;
  const {$} = Vendor;

  vm.company = {};
  vm.countries = countries.data;
  vm.categories = categories.data;
  vm.registerCompany = registerCompany;
  vm.getImageUrl = getImageUrl;

  $scope.$watch('vm.company.description', function(current, original) {
    vm.company.short_description = vm.company.description ? current.substring(0, 180) + '...' : '';
  });

  function registerCompany(isValid) {
    if(isValid) {
      companyResource.create(vm.company).then(function() {
        toastr.success('Company created.', 'Yay!');
        $state.go('app.companies');
        console.log('Company Saved');
      }, function(err) {
          toastr.error('Error while creating company.', 'Error!');
      });
    }
  }

  function getImageUrl() {
    return imageService.getCompanyImageUrl(vm.company);
  }

  //file upload
  vm.onFileSelected = function() {
    if(vm.file) {
      vm.open();
    }
  };

  vm.openFileDialog = function() {
    $('#up-photo').click();
  };

  vm.open = function(size) {
    $uibModal.open({
      animation: true,
      templateUrl: `${ROOT_DIR}/src/components/company/create/modal.tpl.html`,
      controller: 'CompanyModalController',
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

  // Datepicker options
  vm.today = function() {
    vm.company.creation_date = new Date();
  };

  vm.today();

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
}

export default CompanyCreateController;
