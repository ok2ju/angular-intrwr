import $ from 'jquery';
import 'cropper';

const cropKeys = [
  'width',
  'height',
  'x',
  'y',
  'scaleX',
  'scaleY'
];

function ModalController($timeout, Upload, config, $mdDialog, userResource, file, user) {
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
        const data = resp.data;
        if(data._id) {
          userResource.update(user._id, {imageId: data._id}).then(function() {
            user.imageId = data._id;
            vm.cancel();
          });
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

export default ModalController;
