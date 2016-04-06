import {createResource} from './createResource';

function VacancyResource(Vendor) {
  const {R} = Vendor;
  const RESOURCE_NAME = 'vacancies';

  return createResource(RESOURCE_NAME, R);
}

export default VacancyResource;
