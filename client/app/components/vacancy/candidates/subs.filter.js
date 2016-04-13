function SubsFilter() {
  return function(input, term) {
    var obj = {};
    angular.forEach(input, function(v, i) {
      if(term === 'assigned') {
        if(angular.isDefined(v.interview)) {
          obj[i] = v;
        }
      } else if(term === 'notAssigned') {
        if(!angular.isDefined(v.interview)) {
          obj[i] = v;
        }
      } else if(term === 'all') {
        obj[i] = v;
      }
    });

    return obj;
  };
}

export default SubsFilter;
