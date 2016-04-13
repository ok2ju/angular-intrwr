import modalTemplate from './modal.tpl.html';

function SettingsController($state, countries,
                            imageService, Vendor, $mdDialog, $mdConstant,
                            notificationService, myself, userResource) {
  "ngInject";

  const {$} = Vendor;
  const {_} = Vendor;
  const {moment} = Vendor;
  const logger = Vendor.logger.get('SettingsController');
  const vm = this;
  
  vm.user = myself;

  vm.getImageUrl = getImageUrl;
  vm.updateProfile = updateProfile;
  vm.addNewExperience = addNewExperience;
  vm.deleteExperience = deleteExperience;
  
  vm.user.social = vm.user.social || {};

  if(myself.dob) {
    vm.user.dob = moment(myself.dob).toDate();
  }

  vm.user.dob = moment().toDate();

  if(!vm.user.experiences) {
    vm.user.experiences = [{}];
  }

  function getImageUrl() {
    return imageService.getUserImageUrl(vm.user);
  }

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
      vm.updatedUser = {
        about: vm.user.about,
        country: vm.user.country.name,
        dob: vm.user.dob,
        email: vm.user.email,
        experiences: vm.user.experiences,
        imageId: vm.user.imageId,
        name: vm.user.name,
        phone: vm.user.phone,
        skills: vm.user.skills,
        social: vm.user.social,
        surname: vm.user.surname
      };

      userResource.update(vm.user._id, vm.updatedUser).then(() => {
        $state.go('app.userProfile', {'id': myself._id});
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

  // Selected Country
  vm.user.country = selectedCountry();

  function selectedCountry() {
    let countryString = myself.country;
    let formattedCountries = loadCountries();
    let index = _.findIndex(formattedCountries, ['name', countryString]);
    return formattedCountries[index];
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
        user: vm.user,
        file: vm.file
      },
      template: modalTemplate,
      controller: 'ModalInstanceController',
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

export default SettingsController;
