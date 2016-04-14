import angular from 'angular';
import interviewFeedbackController from './feedback.controller';
import starRating from './stars.directive';
import interviewFeedbackTemplate from './feedback.tpl.html';

let feedbackModule = angular.module('interview.feedback', [])
.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('app.interviewfeedback', {
      url: '/interview/:id/feedback',
      template: interviewFeedbackTemplate,
      controller: 'InterviewFeedbackController',
      controllerAs: 'vm',
      data: {
        requiresLogin: true,
        pageTitle: 'Interview feedback'
      },
      resolve: {
        interviewResource: 'interviewResource',

        interview(interviewResource, $stateParams) {
          return interviewResource.one($stateParams.id); 
        },

        feedback(interviewResource, $stateParams) {
          return interviewResource.getFeedback($stateParams.id);
        }
      }
    });
})
.controller('InterviewFeedbackController', interviewFeedbackController)
.directive('starRating', starRating);

export default feedbackModule;
