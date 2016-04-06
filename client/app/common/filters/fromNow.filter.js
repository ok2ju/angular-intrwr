import moment from 'moment';

function FromNowFilter() {
  return function(date) {
    return moment(date).fromNow();
  };
}

export default FromNowFilter;
