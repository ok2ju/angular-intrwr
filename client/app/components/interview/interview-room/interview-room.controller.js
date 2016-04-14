function InterviewRoomController(Vendor, myself, iOwnerInterviews, iCandidateInterviews, openRequestedPopupService) {
  const {moment} = Vendor;
  const vm = this;

  vm.user = myself;
  vm.ownerInterviews = iOwnerInterviews;
  vm.candidateInterviews = vm.editedInterviews;
  vm.openConferenceRoom = openRequestedPopupService.openRequestedPopup;

  vm.editedInterviews = iCandidateInterviews.map((interview) => {
    const message = ['Interview with', interview.company.name];
    interview.title = message.join(' ');
    return interview;
  });
  
}

export default InterviewRoomController;
