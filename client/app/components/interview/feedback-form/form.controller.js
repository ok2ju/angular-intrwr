function FeedbackFormController(interview, $state, $stateParams, interviewResource) {
  const vm = this;

  vm.interview = interview;
  vm.addPersonalSkill = addPersonalSkill;
  vm.removePersonalSkill = removePersonalSkill;
  vm.addTechnicalSkill = addTechnicalSkill;
  vm.removeTechnicalSkill = removeTechnicalSkill;
  vm.submitFeedback = submitFeedback;

  vm.feedback = {};

  vm.feedback.personal = [
    {
      id: '1'
    }
  ];
  vm.feedback.technical = [
    {
      id: '1'
    }
  ];

  // Manage personal skills
  function addPersonalSkill() {
    var index = vm.feedback.personal.length + 1;
    vm.feedback.personal.push({id: 'skill' + index});
  }

  function removePersonalSkill(id) {
    var index = vm.feedback.personal.indexOf(id);
    vm.feedback.personal.splice(index, 1);
  }

  // Manage technical skills
  function addTechnicalSkill() {
    var index = vm.feedback.personal.length + 1;
    vm.feedback.technical.push({id: 'skill' + index});
  }

  function removeTechnicalSkill(id) {
    var index = vm.feedback.technical.indexOf(id);
    vm.feedback.technical.splice(index, 1);
  }

  function submitFeedback() {
    console.log(vm.feedback);
    interviewResource.feedback($stateParams.id, vm.feedback).then(() => {
      console.log('Post feedback successfully!');
    });
  }
}

export default FeedbackFormController;
