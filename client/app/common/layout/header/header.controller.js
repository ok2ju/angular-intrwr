function LayoutHeaderController($state, imageService, authService, $rootScope, interviewResource,
                                Vendor, openRequestedPopupService, uiState, notificationService) {
  const vm = this;
  const {moment} = Vendor;

  vm.isActivity = false;
  vm.openConferenceRoom = openRequestedPopupService.openRequestedPopup;
  vm.toggleSidebar = toggleSidebar;
  vm.logout = logout;
  vm.toggleActivity = toggleActivity;
  vm.clickedSomewhereElse = clickedSomewhereElse;
  vm.getImageUrl = getImageUrl;

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

  function getImageUrl() {
    return imageService.getUserImageUrl(vm.user);
  }

  function logout() {
    authService.logout();
    $state.go('intro.login');
    notificationService.showNotification('You successfully logged out!');
  }

  function toggleActivity() {
    vm.isActivity = !vm.isActivity;
  }

  function clickedSomewhereElse() {
    vm.isActivity = false;
  }

  function toggleSidebar() {
    uiState.setState(!uiState.getState());
  }
}

export default LayoutHeaderController;
