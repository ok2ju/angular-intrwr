function CompanyCardController(config, Vendor, imageService) {
  const vm = this;
  const {_} = Vendor;

  vm.getImageUrl = imageService.getCompanyImageUrl;
  vm.getUserImageUrl = imageService.getUserImageUrl;

  vm.settings = {
    withEditButton: vm.editable || false,
  };

}

export default CompanyCardController;
