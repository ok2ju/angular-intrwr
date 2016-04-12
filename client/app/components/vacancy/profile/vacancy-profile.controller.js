function VacancyProfileController(vacancy, myself, subscriptions, subscriptionResource, imageService,
                                                    config, $state, notificationService) {
  const vm = this;

  vm.vacancy = vacancy;
  vm.subscriptions = subscriptions;
  vm.isSubscribed = isSubscribed;
  vm.subscribe = subscribe;
  vm.unsubscribe = unsubscribe;
  vm.getImage = getImage;
  vm.getUserImageUrl = imageService.getUserImageUrl;

  function isSubscribed(vacancy) {
    let index = _.find(subscriptions, function(o) {
      return o.candidate._id == myself._id;
    });

    return index ? true : false;
  }

  function subscribe(vacancy) {
    subscriptionResource.create({vacancy: vacancy._id}).then(function() {
      $state.go($state.current, {}, { reload: true });
      notificationService.showNotification('You are successful subscribed!');
    });
  }

  function unsubscribe() {
    let subscription = _.find(subscriptions, function(o) {
      return o.candidate._id == myself._id;
    });

    subscriptionResource.delete(subscription._id).then(function() {
      $state.go($state.current, {}, { reload: true });
      notificationService.showNotification('You are unsubscribed!');
    });
  }

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

}

export default VacancyProfileController;
