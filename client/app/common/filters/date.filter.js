function MomentFilter(Vendor) {
  const {moment} = Vendor;
  
  return function(dateString, format) {
    return moment(dateString).format(format);
  };
}

export default MomentFilter;
