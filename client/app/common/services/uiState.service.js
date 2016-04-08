function UIState($rootScope, Vendor, $q) {
  const {$} = Vendor;
  const {_} = Vendor;

  const self = this;
  let defer = $q.defer();
  let $win = $(window);

  this.state = false;

  $(window).on('resize', _.debounce(checkScreenWidth, 400));

  this.observeState = function() {
    return defer.promise;
  };

  this.setState = function(state) {
    self.state = state;
    defer.notify(self.state);
  };

  this.getState = function() {
    return self.state;
  };

  function checkScreenWidth() {
    if($win.width() >= 992) {
      $rootScope.$apply(function() {
        self.setState(false);
      });
    }
  }

}

export default UIState;
