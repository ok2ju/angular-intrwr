function UIState($rootScope, Vendor) {
  const {$} = Vendor;
  const {_} = Vendor;

  /*let state = {
    sidebarIsToggled: false
  };*/

  let state = false;

  let $win = $(window);

  $(window).on('resize', _.debounce(checkScreenWidth, 400));

  function checkScreenWidth() {
    if($win.width() >= 992) {
      $rootScope.$apply(function() {
        update(false);
      });
    }
  }

  function update(newState) {
    state = newState;
  }

  function getState() {
    return state;
  }

  return {
    update: update,
    getState: getState
  };
}

export default UIState;
