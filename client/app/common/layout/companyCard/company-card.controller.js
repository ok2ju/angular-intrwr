function CompanyCardController(config, Vendor, imageService) {
  const vm = this;
  const {_} = Vendor;

  vm.getImageUrl = imageService.getCompanyImageUrl;
  vm.getUserImageUrl = imageService.getUserImageUrl;

  vm.settings = {
    withEditButton: vm.editable || false,
  };

  const urlTransformer = (url) => {
    return (!_.isEmpty(url)) ? `${config.ROOT_DIR}/${url}`: url;
  };

}

export default CompanyCardController;
