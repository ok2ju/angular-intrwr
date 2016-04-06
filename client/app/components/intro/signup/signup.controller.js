function SignupController (userResource, store, $state) {
  "ngInject";

  const vm = this;

  vm.user = {};
  vm.register = register;

  function register() {
    userResource.create(vm.user).then(function(user) {
      store.set('jwt', user.id_token);
      $state.go('app.userSettings.general');
      /*toastr.success('Your account has been created.', 'Congratulations!');*/
    }, function(err) {
        /*toastr.error('Something goes wrong.', 'Error!');*/
    });
  }
}

export default SignupController;
