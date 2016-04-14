import angular from 'angular';
import interviewRoomController from './interview-room.controller';
import interviewRoomTemplate from './interview-room.tpl.html';

let interviewRoomModule = angular.module('interviewRoom', [])
.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('app.iroom', {
      url: '/iroom',
      template: interviewRoomTemplate,
      controller: 'InterviewRoomController',
      controllerAs: 'vm',
      data: {
        requiresLogin: true,
        pageTitle: 'Interview Room'
      },
      resolve: {
        interviewResource: 'interviewResource',

        iOwnerInterviews(interviewResource, myself) {
          return interviewResource.list({owner: myself._id});
        },

        iCandidateInterviews(interviewResource, myself) {
          return interviewResource.list({candidate: myself._id});
        }
      }
    });
})
.controller('InterviewRoomController', interviewRoomController);

export default interviewRoomModule;
