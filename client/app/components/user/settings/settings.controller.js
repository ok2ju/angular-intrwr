function SettingsController($state, config, countries, authService, imageService, Vendor) {
  "ngInject";

  const {$} = Vendor;
  const {moment} = Vendor;
  const logger = Vendor.logger.get('SettingsController');

  const vm = this;
  vm.user = {};

  // Fetch countries for dropdown
  vm.countries = countries.data;

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
        $state.go($state.current, {}, { reload: true });
        /*toastr.success('Your settings was successfully updated.', 'Yay!');*/
      }, function(err) {
        /*toastr.error('Error while updating.', 'Error!');*/
      });
    }
  }
}

export default SettingsController;
