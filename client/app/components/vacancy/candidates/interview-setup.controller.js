function InterviewSetupModalCtrl($mdDialog, $state, subscription, vacancyId, interviewResource, config, Vendor) {
  const vm = this;
  const {moment} = Vendor;
  const {CALENDAR, CANDIDATES_GRID} = config.states;

  vm.subscription = subscription;
  vm.vacancyId = vacancyId;

  vm.ok = ok;
  vm.cancel = cancel;

  vm.myDate = new Date();

  vm.minDate = vm.myDate;
  vm.maxDate = new Date(vm.myDate.getFullYear(), vm.myDate.getMonth() + 3, vm.myDate.getDate());

  function ok() {

    const date = mergeDateAndTime(vm.myDate, vm.time);
    const interview = {
      date: date.toDate(),
      candidate: vm.subscription.candidate._id,
      vacancy: vm.vacancyId,
      company: vm.subscription.vacancy.company_id,
      title: `Interview with ${vm.subscription.candidate.name} ${vm.subscription.candidate.surname}`
    };

    interviewResource.create(interview).then(() => {
      vm.cancel();
      $state.go(CALENDAR);
    });
  }

  function cancel() {
    $mdDialog.hide();
  }

  function mergeDateAndTime(_date, _time) {
    const date = moment(_date);
    /*const time = moment(_time);*/

    date.day(date.day());
    date.second(0);
    date.minutes(_time.minutes);
    date.hours(_time.hours);

    return date;
  }
}

export default InterviewSetupModalCtrl;
