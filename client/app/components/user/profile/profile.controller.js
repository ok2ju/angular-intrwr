function UserProfileController(Vendor, imageService, user) {
  const vm = this;
  const {moment} = Vendor;

  vm.user = user;
  vm.user.age = moment().diff(moment(vm.user.dob, 'YYYYMMDD'), 'years');
  vm.getImageUrl = getImageUrl;

  function getImageUrl() {
    return imageService.getUserImageUrl(vm.user);
  }

}

export default UserProfileController;
