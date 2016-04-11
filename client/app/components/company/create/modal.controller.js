import $ from 'jquery';

var cropKeys = [
  'width',
  'height',
  'x',
  'y',
  'scaleX',
  'scaleY'
];

module.exports = function ModalController($uibModalInstance, $timeout, Upload, config, companyResource, file, company) {
  var vm = this;

  vm.file = file;
  Upload.dataUrl(file).then(function(url) {
    vm.dataUrl = url;
    $timeout(init.bind(this));
  });

  vm.cropData = {};

  vm.ok = function () {
    var data = {
      file: vm.file,
      x: vm.cropData.x,
      y: vm.cropData.y,
      h: vm.cropData.height,
      w: vm.cropData.width,
      "Content-Type": vm.file.type !== '' ? vm.file.type : 'application/octet-stream'
    };

    Upload.upload({
      url: config.API_URL + '/api/v1/images',
      data: data
    }).then(function(resp) {
      var data = resp.data;
      if(data._id) {
        company.imageId = data._id;
        vm.cancel();
      }
    });
  };

  vm.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  function init() {
    vm.cropper = $('.modal-body > img').cropper({
      aspectRatio: 1 / 1,
      crop: function(e) {
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
};
