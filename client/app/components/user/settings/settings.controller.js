function SettingsController($state, config, countries, authService, imageService, Vendor, $mdToast, notificationService) {
  "ngInject";

  const {$} = Vendor;
  const {moment} = Vendor;
  const logger = Vendor.logger.get('SettingsController');

  const vm = this;
  vm.user = {};

  vm.updateProfile = updateProfile;
  vm.addNewExperience = addNewExperience;
  vm.deleteExperience = deleteExperience;

  authService.me().then((myself) => {
    vm.user = myself;
    vm.user.social = vm.user.social || {};

    if(myself.dob) {
      vm.user.dob = moment(myself.dob).toDate();
    }

    vm.user.dob = moment().toDate();

    if(!vm.user.experiences) {
      vm.user.experiences = [{}];
    }
  });

  vm.getImageUrl = function() {
    return imageService.getUserImageUrl(vm.user);
  };

  function addNewExperience() {
    const newItemId = vm.user.experiences.length + 1;
    vm.user.experiences.push({id: 'exp' + newItemId});
  }

  function deleteExperience(id) {
    var index = vm.user.experiences.indexOf(id);
    vm.user.experiences.splice(index, 1);
  }

  function updateProfile(isValid) {
    if(isValid) {
      vm.user.put().then(function() {
        notificationService.showNotification('Successfully updated!');
      }, function(err) {
        notificationService.showNotification('Error while updating!');
      });
    }
  } 

  // Select component
  vm.countries = loadCountries();
  vm.isDisabled = false;
  vm.noCache = true;

  vm.querySearch = function(query) {
    let results = query ? vm.countries.filter( vm.createFilterFor(query) ) : vm.countries;
    return results;
  };

  vm.createFilterFor = function(query) {
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
}

export default SettingsController;
