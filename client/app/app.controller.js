function AppController($rootScope) {
  const vm = this;

  $rootScope.$watch('isToggled', (v) => {
    vm.isToggled = v;
  });
}

export default AppController;
