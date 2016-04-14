import angular from 'angular';
import 'angular-ui-calendar';
import calendarController from './calendar.controller';
import calendarTemplate from './calendar.tpl.html';

let calendarModule = angular.module('calendar', ['ui.calendar'])
.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('app.calendar', {
      url: '/calendar',
      template: calendarTemplate,
      controller: 'CalendarController',
      controllerAs: 'vm',
      data: {
        requiresLogin: true,
        pageTitle: 'Calendar'
      },
      resolve: {
        interviewResource: 'interviewResource',

        interviews(interviewResource, myself) {
          return interviewResource.list({relatedTo: myself._id});
        }
      }
    });
})
.controller('CalendarController', calendarController);

export default calendarModule;
