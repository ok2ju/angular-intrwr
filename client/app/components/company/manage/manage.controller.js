function CompanyManageController(Vendor, companies) {
  const vm = this;
  const logger = Vendor.logger.get('CompanyManageController');

  vm.companies = companies;
  
}

export default CompanyManageController;
