function JDatePickerCount() {
  var instanceCount = 0;

  var _Increment = function() {
    instanceCount++;
  }

  var _GetCount = function() {
    return instanceCount;
  }

  return {
    GetCount: _GetCount,
    Increment: _Increment
  };
}

export default JDatePickerCount;