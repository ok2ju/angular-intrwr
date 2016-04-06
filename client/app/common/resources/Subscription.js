import {createResource} from './createResource';

function SubscriptionResource(Vendor) {
  const {R} = Vendor;
  const RESOURCE_NAME = 'subscriptions';
  return createResource(RESOURCE_NAME, R);
}

export default SubscriptionResource;
