function LoginController($state, Vendor, authService, notificationService) {
  "ngInject";
  
  const vm = this;
  const logger = Vendor.logger.get('LoginController');

  vm.user = {};
  vm.login = login;

  function login() {
    authService.login(vm.user).then((user) => {
      $state.go('app.userSettings.general', {});
      notificationService.showNotification('You have successfully logged in!');
      logger.debug('login success: ', user);
    }).catch((err) => {
      notificationService.showNotification('Invalid username or password!');
      logger.error('login err: ', err);
    });
  }
}

export default LoginController;
