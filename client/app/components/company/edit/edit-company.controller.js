import companyPhotoModalTemplate from './photo-modal.tpl.html';
import companyDeleteTemplate from './edit-modal.tpl.html';

function EditCompanyController(company, $scope,
                          $state, config,
                          $stateParams, countries, categories, imageService, Vendor, notificationService, $mdDialog) {
  const {moment} = Vendor;
  const {$} = Vendor;
  const vm = this;

  vm.company = company;
  vm.company.creation_date = moment(company.creation_date).toDate();
  vm.countries = countries.data;
  vm.categories = categories.data;
  vm.updateCompany = updateCompany;
  vm.getImageUrl = getImageUrl;


  function getImageUrl() {
    return imageService.getCompanyImageUrl(vm.company);
  }

  function updateCompany() {
    vm.company.put().then(function() {
      $state.go('app.manageCompany');
      notificationService.showNotification('Company settings was successfully updated!');
    }, function(err) {
      notificationService.showNotification('Error while updating!');
    });
  }

  // Select component
  vm.countries = loadCountries();
  vm.categories = loadCategories();
  vm.isDisabled = false;
  vm.noCache = true;

  vm.querySearchCountries = function(query) {
    let results = query ? vm.countries.filter( vm.createFilterForCountries(query) ) : vm.countries;
    return results;
  };

  vm.createFilterForCountries = function(query) {
    let lowercaseQuery = angular.lowercase(query);
    return function filterFn(state) {
      return (state.value.indexOf(lowercaseQuery) === 0);
    };
  };

  vm.querySearchCategories = function(query) {
    let results = query ? vm.categories.filter( vm.createFilterForCategories(query) ) : vm.categories;
    return results;
  };

  vm.createFilterForCategories = function(query) {
    let lowercaseQuery = angular.lowercase(query);
    return function filterFn(state) {
      return (state.value.indexOf(lowercaseQuery) === 0);
    };
  };

  function loadCountries() {
    let countriesArray = countries.data;
    return countriesArray.map((country) => {
      country.value = country.name.toLowerCase();
      return country;
    });
  }

  function loadCategories() {
    let categoriesArray = categories.data;
    return categoriesArray.map((category) => {
      category.value = category.name.toLowerCase();
      return category;
    });
  }

  // Open modal when delete company
  vm.openDeleteModal = openDeleteModal;

  function openDeleteModal() {
    $mdDialog.show({
      clickOutsideToClose: true,
      locals: { 
        companyId: vm.company._id
      },
      template: companyDeleteTemplate,
      controller: 'EditCompanyModalController',
      controllerAs: 'vm'
   });
  }

  // Open Modal dialog
  vm.openModal = openModal;
  vm.onFileSelected =  onFileSelected;
  vm.openFileDialog = openFileDialog;

  function onFileSelected() {
    if(vm.file) {
      vm.openModal();
    }
  }

  function openFileDialog() {
    $('#up-photo').click();
  }

  function openModal() {
    $mdDialog.show({
      clickOutsideToClose: true,
      locals: { 
        company: vm.company,
        file: vm.file
      },
      template: companyPhotoModalTemplate,
      controller: 'CompanyPhotoModalController',
      controllerAs: 'vm'
   });
  }

}

export default EditCompanyController;
