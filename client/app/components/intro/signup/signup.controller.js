function SignupController (userResource, store, $state, notificationService) {
  "ngInject";

  const vm = this;

  vm.user = {};
  vm.register = register;

  function register() {
    userResource.create(vm.user).then(function(user) {
      store.set('jwt', user.id_token);
      $state.go('app.userSettings.general');
      notificationService.showNotification('Your account has been created!');
    }, function(err) {
      notificationService.showNotification('Something goes wrong!');
    });
  }
}

export default SignupController;
