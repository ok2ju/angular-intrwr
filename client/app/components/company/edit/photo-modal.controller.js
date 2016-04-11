import $ from 'jquery';

var cropKeys = [
  'width',
  'height',
  'x',
  'y',
  'scaleX',
  'scaleY'
];

function CompanyPhotoModalController($mdDialog, $timeout, Upload, config, file, company) {
  const vm = this;

  vm.file = file;
  vm.cropData = {};
  vm.ok = ok;
  vm.cancel = cancel;

  Upload.dataUrl(file).then(function(url) {
    vm.dataUrl = url;
    $timeout(init.bind(this));
  });

  function ok() {
    const data = {
      file: vm.file,
      "Content-Type": vm.file.type !== '' ? vm.file.type : 'application/octet-stream',
      x: vm.cropData.x,
      y: vm.cropData.y,
      h: vm.cropData.height,
      w: vm.cropData.width
    };

    Upload.upload({
      url: config.API_URL + '/api/v1/images',
      data: data
    }).then(function(resp) {
      const data = resp.data;
      if(data._id) {
        company.imageId = data._id;
        vm.cancel();
      }
    });
  }

  function cancel() {
    $mdDialog.hide();
  }

  function init() {
    vm.cropper = $('.modal-body > img').cropper({
      aspectRatio: 1 / 1,
      crop(e) {
        cropKeys.forEach(function(key) {
          vm.cropData[key] = e[key];
        });
      },
      movable: false,
      zoomable: false,
      rotatable: false,
      scalable: false
    });
  }

}

export default CompanyPhotoModalController;
