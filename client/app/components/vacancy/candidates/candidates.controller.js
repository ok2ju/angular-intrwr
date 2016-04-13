import modalTemplate from './views/interview-setup-modal.tpl.html';

function VacancyCandidatesController(subscriptions, interviewResource, imageService, $state,
  $stateParams, config, $mdDialog) {

  const vm = this;
  const {CALENDAR, CANDIDATES_GRID} = config.states;

  const vacancyId = $stateParams.id;

  vm.subscriptions = subscriptions
  vm.getUserImageUrl = imageService.getUserImageUrl;
  vm.getInfoAboutInterview = getInfoAboutInterview;
  vm.cancelInterview = cancelInterview;
  vm.checkAll = checkAll;
  vm.checkAssigned = checkAssigned;
  vm.checkNotAssigned = checkNotAssigned;

  vm.checkAll();

  $state.go(CANDIDATES_GRID);

  /*vm.openInterviewModal = function(subscription) {
    const modalInstance = $uibModal.open({
      animation: true,
      templateUrl: `${config.ROOT_DIR}/src/components/vacancy/candidates/views/interview-setup-modal.tpl.html`,
      controller: 'InterviewSetupModalCtrl',
      controllerAs: 'vm'
    });

    modalInstance.result.then(onInterviewSetupModalOk);

    function onInterviewSetupModalOk(data) {
      const date = mergeDateAndTime(data.date, data.time);
      const interview = {
        date: date.toDate(),
        candidate: subscription.candidate._id,
        vacancy: vacancyId,
        company: subscription.vacancy.company_id,
        title: `Interview with ${subscription.candidate.name} ${subscription.candidate.surname}`
      };
      interviewResource.create(interview).then(() => {
        $state.go(CALENDAR);
      });
    }
  };*/

  vm.openInterviewModal = function($event, subscription) {
    $mdDialog.show({
      targetEvent: $event,
      clickOutsideToClose: true,
      locals: { 
        subscription: subscription,
        vacancyId: vacancyId
      },
      template: modalTemplate,
      controller: 'InterviewSetupModalCtrl',
      controllerAs: 'vm'
   });
  };

  function getInfoAboutInterview(id) {
    let interviewDate;
    if(id) {
      interviewResource.one(id).then((interview) => {
        interviewDate = interview.date;
      });
    }

    return interviewDate;
  }

  function cancelInterview(id) {
    if(id) {
      interviewResource.delete(id).then(() => {
        $state.go($state.current, {}, { reload: true });
      });
    }
  }

  function checkAll() {
    vm.candidateFilter = 'all';
  }

  function checkAssigned() {
    vm.candidateFilter = 'assigned';
  }

  function checkNotAssigned() {
    vm.candidateFilter = 'notAssigned';
  }
}

export default VacancyCandidatesController;
