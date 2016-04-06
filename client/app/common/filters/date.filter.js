import moment from 'moment';

function MomentFilter() {
  return function(dateString, format) {
    return moment(dateString).format(format);
  };
}

export default MomentFilter;
