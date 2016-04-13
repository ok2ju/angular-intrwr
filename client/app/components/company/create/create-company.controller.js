import modalTemplate from './modal.tpl.html';

function CompanyCreateController(companyResource, $scope,
                                $state, countries, categories, imageService, Vendor, notificationService, $mdDialog, $mdConstant) {
  const vm = this;
  const {$} = Vendor;

  vm.specializations = [];
  vm.registerCompany = registerCompany;
  vm.getImageUrl = getImageUrl;

  $scope.$watch('vm.description', function(current, original) {
    vm.short_description = vm.description ? current.substring(0, 180) + '...' : '';
  });

  function registerCompany(isValid) {
    if(isValid) {

      vm.company = {
        category: vm.category.name,
        description: vm.description,
        email: vm.email,
        location: vm.location.name,
        name: vm.name,
        phone: vm.phone,
        short_description: vm.short_description,
        site: vm.site,
        specializations: vm.specializations
      };

      companyResource.create(vm.company).then(function() {
        $state.go('app.companies');
        notificationService.showNotification('Company created!');
      }, function(err) {
        notificationService.showNotification('Error while creating company!');
      });
    }
  }

  function getImageUrl() {
    return imageService.getCompanyImageUrl(vm.company);
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
      template: modalTemplate,
      controller: 'CompanyModalController',
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

}

export default CompanyCreateController;
