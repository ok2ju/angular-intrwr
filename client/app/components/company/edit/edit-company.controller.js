import companyPhotoModalTemplate from './photo-modal.tpl.html';
import companyDeleteTemplate from './edit-modal.tpl.html';

function EditCompanyController(company, $scope, companyResource, $state,
                countries, categories, imageService, Vendor, notificationService, $mdDialog) {
  const {moment} = Vendor;
  const {$} = Vendor;
  const vm = this;

  vm.company = company;
  vm.company.creation_date = moment(company.creation_date).toDate();
  vm.countries = countries.data;
  vm.categories = categories.data;
  vm.updateCompany = updateCompany;
  vm.getImageUrl = getImageUrl;

  $scope.$watch('vm.company.description', function(current, original) {
    vm.company.short_description = vm.company.description ? current.substring(0, 180) + '...' : '';
  });

  function getImageUrl() {
    return imageService.getCompanyImageUrl(vm.company);
  }

  function updateCompany() {

    vm.updatedCompany = {
      category: vm.company.category.name,
      description: vm.company.description,
      email: vm.company.email,
      location: vm.company.location.name,
      name: vm.company.name,
      phone: vm.company.phone,
      short_description: vm.company.short_description,
      site: vm.company.site,
      specializations: vm.company.specializations,
      imageId: vm.company.imageId
    };

    companyResource.update(vm.company._id, vm.updatedCompany).then(() => {
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

  // Selected Category
  vm.company.category = selectedCategory();

  function selectedCategory() {
    let categoryString = company.category;
    let formattedCategories = loadCategories();
    let index = _.findIndex(formattedCategories, ['name', categoryString]);
    return formattedCategories[index];
  }

  // Selected Location
  vm.company.location = selectedLocation();

  function selectedLocation() {
    let locationString = company.location;
    let formattedLocations = loadCountries();
    let index = _.findIndex(formattedLocations, ['name', locationString]);
    return formattedLocations[index];
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
