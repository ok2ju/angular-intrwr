function FromNowFilter(Vendor) {
  const {moment} = Vendor;
  
  return function(date) {
    return moment(date).fromNow();
  };
}

export default FromNowFilter;
