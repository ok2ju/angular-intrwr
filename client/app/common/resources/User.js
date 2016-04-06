import {createResource} from './createResource';

function UserResource(Vendor) {
  const {R} = Vendor;
  const logger = Vendor.logger.get('UserResource');
  const RESOURCE_NAME = 'users';

  return createResource(RESOURCE_NAME, R, {
    login(user) {
      logger.debug('login called, user: ', user);
      return R.all('login').post(user);
    },

    companies(id) {
      logger.debug('user companies, userid: ', id);
      return R.all(RESOURCE_NAME, id).getList('companies');
    },

    me() {
      return R.one(RESOURCE_NAME, 'me').get();
    }
  });
}

export default UserResource;
