function VacancyCardController(config, Vendor, authService, subscriptionResource, $state, notificationService) {
  const vm = this;
  const {_} = Vendor;

  vm.getImage = getImage;

  vm.settings = {
    withFollowButton: vm.withFollow || false,
    withEditButton: vm.editable || false,
    withCandidates: vm.withCandidates || false
  };

  const urlTransformer = (url) => {
    return (!_.isEmpty(url)) ? `${url}`: url;
  };

  const images = _.mapValues({
    'Developer': 'images/icons/vacancies/coder.png',
    'Analythyc': 'images/icons/vacancies/analythic.png',
    'Human Resource': 'images/icons/vacancies/hr.png',
    'Sales Manager': 'images/icons/vacancies/sales.png',
    'Project Manager': 'images/icons/vacancies/pm.png'
  }, urlTransformer);

  function getImage(vacancyType) {
    return images[vacancyType];
  }

  authService.me().then((myself) => {
    let subs;

    subscriptionResource.list({candidate: myself._id}).then(function(subscriptions) {
      subs = subscriptions;

      vm.isSubscribed = function(vacancy) {
        let index = _.find(subs, function(o) {
          return o.vacancy._id == vacancy._id;
        });

        return index ? true : false;
      };

      vm.subscribe = function(vacancy) {
        subscriptionResource.create({vacancy: vacancy._id}).then(function() {
          $state.go($state.current, {}, { reload: true });
          notificationService.showNotification('You are successful subscribed!');
        });
      };

      vm.unsubscribe = function(vacancy) {
        let subscription = _.find(subs, function(o) {
          return o.vacancy._id == vacancy._id;
        });

        subscriptionResource.delete(subscription._id).then(function() {
          $state.go($state.current, {}, { reload: true });
          notificationService.showNotification('You are unsubscribed!');
        });
      };

    });

  });
}

export default VacancyCardController;
