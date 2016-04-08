function AppController(uiState) {
  const vm = this;

  uiState.observeState().then(null, null, function(state) {
    vm.isToggled = state;
  });
}

export default AppController;
