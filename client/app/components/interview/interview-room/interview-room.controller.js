function InterviewRoomController(Vendor, myself, iOwnerInterviews, iCandidateInterviews, openRequestedPopupService) {
  const {moment} = Vendor;
  const vm = this;

  vm.user = myself;
  vm.ownerInterviews = iOwnerInterviews;
  vm.openConferenceRoom = openRequestedPopupService.openRequestedPopup;

  vm.candidateInterviews = iCandidateInterviews.map((interview) => {
    const message = ['Interview with', interview.company.name];
    interview.title = message.join(' ');
    return interview;
  });

  let mergedInterviews = vm.ownerInterviews.concat(vm.candidateInterviews);
  
  vm.completedInterviews = mergedInterviews.filter((interview) => {
    return interview.status === 'Completed';
  });

  vm.inprogressInterviews = mergedInterviews.filter((interview) => {
    return interview.status === 'InProgress';
  });
}

export default InterviewRoomController;
