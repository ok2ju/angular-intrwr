import {createResource} from './createResource';

function InterviewResource(Vendor) {
  const {R} = Vendor;
  const RESOURCE_NAME = 'interview';
  return createResource(RESOURCE_NAME, R, {
    feedback(id, obj) {
      return R.one(RESOURCE_NAME, id).all('feedback').post(obj);
    },

    getFeedback(id) {
      return R.one(RESOURCE_NAME, id).customGET('feedback');
    }
  });
}

export default InterviewResource;
