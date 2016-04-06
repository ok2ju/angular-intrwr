function LayoutHeaderController($state, $scope, store, imageService, authService, $rootScope, interviewResource, Vendor, openRequestedPopupService) {
  const vm = this;
  const {moment} = Vendor;

  vm.openConferenceRoom = openRequestedPopupService.openRequestedPopup;
  vm.toggleSidebar = toggleSidebar;
  vm.isToggled = false;

  authService.me().then((myself) => {
    vm.user = myself;

    interviewResource
    .list({relatedTo: vm.user._id})
    .then((interviews) => {

      let unsortedInterviews = interviews.filter(interview => {
        if(interview.candidate._id === vm.user._id) {
          const message = ['Interview with', interview.company.name];
          interview.title = message.join(' ');
        }
        return moment(interview.date).isAfter(moment());
      });

      vm.upcomingInterviews = _.sortBy(unsortedInterviews, ['date']);

    });

  });

  $rootScope.$watch('pageName', (v) => {
    vm.pageName = v;
  });

  vm.getImageUrl = function() {
    return imageService.getUserImageUrl(vm.user);
  };
  vm.isActivity = false;

  vm.logout = function() {
    authService.logout();
    $state.go('intro.login');
    /*toastr.info('You have been logged out.', 'Info!');*/
  };

  vm.toggleActivity = function() {
    vm.isActivity = !vm.isActivity;
  };

  vm.clickedSomewhereElse = function() {
    vm.isActivity = false;
  };

  function toggleSidebar() {
    vm.isToggled = !vm.isToggled;
    $rootScope.$broadcast('sidebarToggleEvent', {
      isToggled: vm.isToggled
    });
  }
}

export default LayoutHeaderController;
