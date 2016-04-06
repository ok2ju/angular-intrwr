export function ImageService(config, Vendor) {
  const {_} = Vendor;

  const CONSTANTS = {
    USER_DEFAULT_IMAGE: 'assets/images/user-default.png',
    COMPANY_DEFAULT_IMAGE: 'assets/images/companies/default.png'
  };

  function getImageUrl(entry, defaultUrl) {
    let res = '';
    if(entry && entry.imageId) {
      res = `${config.API_URL}/api/v1/images/${entry.imageId}`;
    } else if(defaultUrl) {
      res = `${config.ROOT_DIR}/${defaultUrl}`;
    }
    return res;
  }

  function getCompanyImageUrl(company) {
    return getImageUrl(company, CONSTANTS.COMPANY_DEFAULT_IMAGE);
  }

  function getUserImageUrl(user) {
    return getImageUrl(user, CONSTANTS.USER_DEFAULT_IMAGE);
  }

  function getConstants() {
    return _.clone(CONSTANTS);
  }

  return {
    getImageUrl,
    getUserImageUrl,
    getCompanyImageUrl,
    getConstants
  };
}