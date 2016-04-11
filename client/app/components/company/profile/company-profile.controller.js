function CompanyProfileController(myself, company, comments, vacancies, companyResource, $state, $stateParams, imageService) {
  const vm = this;

  vm.company = company;
  vm.owner = company.owner;
  vm.comments = comments;
  vm.vacancies = vacancies;
  vm.getImageUrl = getImageUrl;
  vm.getUserImageUrl = getUserImageUrl;

  vm.comment = {};
  vm.leaveComment = leaveComment;
  vm.removeComment = removeComment;

  function leaveComment(comment) {
    let companyID = $stateParams.id;
    vm.comment.author = {
      id: myself._id,
      name: myself.name,
      surname: myself.surname,
      imageId: myself.imageId
    };

    if(angular.isDefined(vm.comment.text)) {
      companyResource.comment(companyID, vm.comment).then(function() {
        $state.go($state.current, {}, { reload: true });
      });
    } else {
      /*toastr.error('You must fill in comment field.', 'Error!');*/
    }
  }

  function removeComment(id) {
    let companyID = $stateParams.id;
    companyResource.removeComment(companyID, id).then(function() {
      $state.go($state.current, {}, { reload: true });
    });
  }

  function getImageUrl() {
    return imageService.getCompanyImageUrl(vm.company);
  }

  function getUserImageUrl(user) {
    return imageService.getUserImageUrl(user);
  }
  
}

export default CompanyProfileController;
