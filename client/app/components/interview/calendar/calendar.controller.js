function CalendarController(myself, interviews, Vendor, $compile, $scope) {
  const {moment} = Vendor;
  const vm = this;

  vm.user = myself;
  vm.eventSources = [[]];

  vm.eventSources[0] = interviews.map((interview) => {
    if(interview.candidate._id === vm.user._id) {
      const message = ['Interview with', interview.company.name];
      interview.title = message.join(' ');
    }
    interview.start = moment(interview.date);
    return interview;
  });

  /* alert on eventClick */
  vm.alertOnEventClick = function( date, jsEvent, view) {
    console.log(date.title + ' was clicked ');
  };
  /* alert on Drop */
  vm.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view) {
    console.log('Event Droped to make dayDelta ' + delta);
  };
  /* alert on Resize */
  vm.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view) {
    console.log('Event Resized to make dayDelta ' + delta);
  };

  /* Render Tooltip */
  vm.eventRender = function(event, element, view) {
    element.attr({
      'uib-tooltip': event.title,
      'tooltip-placement': 'top'
    });
    $compile(element)($scope);
  };

  vm.uiConfig = {
    calendar: {
      height: '100vh',
      contentHeight: '100vh',
      editable: true,
      header: {
        left: 'title',
        center: 'month basicWeek basicDay agendaWeek agendaDay',
        right: 'today prev,next'
      },
      fixedWeekCount: false,
      columnFormat: 'dddd',
      dayClick: vm.alertEventOnClick,
      eventDrop: vm.alertOnDrop,
      eventResize: vm.alertOnResize,
      eventRender: vm.eventRender
    }
  };
}

export default CalendarController;
