import modalTemplate from './modal.tpl.html';

function SettingsController($state, config, countries, Upload, authService, imageService, Vendor, $mdToast, $mdDialog, $mdConstant, notificationService, myself) {
  "ngInject";

  const {$} = Vendor;
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
