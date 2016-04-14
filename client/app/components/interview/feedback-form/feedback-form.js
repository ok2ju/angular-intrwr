import angular from 'angular';
import feedbackFormController from './form.controller';
import feedbackFormTemplate from './feedback-form.tpl.html';

let feedBackFormModule = angular.module('interview.feedbackform', [])
.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('app.interviewfeedbackform', {
      url: '/interview/:id/feedbackform',
      template: feedbackFormTemplate,
      controller: 'FeedbackFormController',
      controllerAs: 'vm',
      data: {
        requiresLogin: true,
        pageTitle: 'Interview feedback form'
      },
      resolve: {
        interviewResource: 'interviewResource',

        interview(interviewResource, $stateParams) {
          return interviewResource.one($stateParams.id);
        }
      }
    });
})
.controller('FeedbackFormController', feedbackFormController);

export default feedBackFormModule;
