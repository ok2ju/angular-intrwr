import {createResource} from './createResource';

function CompanyResource(Vendor) {
  const {R} = Vendor;
  const RESOURCE_NAME = 'companies';

  return createResource(RESOURCE_NAME, R, {
    comment(id, commentObj) {
      return R.one(RESOURCE_NAME, id).all('comments').post(commentObj);
    },

    comments(companyId) {
      return R.one(RESOURCE_NAME, companyId).all('comments').getList();
    },

    removeComment(companyId, commentId) {
      return R.one(RESOURCE_NAME, companyId).one('comments', commentId).remove();
    }
  });
}

export default CompanyResource;
