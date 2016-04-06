export function OpenRequestedPopupService($window, config) {
  let windowObjectReference = null;
  let strWindowFeatures = 'toolbar=1,menubar=1,location=1,resizable=1,scrollbars=1,status=0,centerscreen=yes';

  function openRequestedPopup(id) {
    if(windowObjectReference === null || windowObjectReference.closed) {
      let windowName = `interview_page_${id}`;
      windowObjectReference = $window.open(`${config.CONF_URL}?interviewId=${id}`, windowName, strWindowFeatures);
    } else {
      windowObjectReference.focus();
    }
  }

  return {
    openRequestedPopup
  };
}
