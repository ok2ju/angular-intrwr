import angular from 'angular';
import candidatesController from './candidates.controller';
import candidatesDashboardController from './dashboard.controller';
import interviewSetupController from './interview-setup.controller';
import subscribersFilter from './subs.filter';
import candidatesDashboardTemplate from './dashboard.tpl.html';
import candidateTemplate from './candidates.tpl.html';
import gridViewCandidatesTemplate from './views/grid-view.tpl.html';
import listViewCandidatesTemplate from './views/list-view.tpl.html';

let candidatesModule = angular.module('vacancy.candidates', [])
.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('app.candidatesDashboard', {
      url: '/dashboard/vacancies',
      template: candidatesDashboardTemplate,
      controller: 'CandidatesDashboardController',
      controllerAs: 'vm',
      data: {
        requiresLogin: true,
        pageTitle: 'Choose vacancy'
      },
      resolve: {
        vacancyResource: 'vacancyResource',

        vacancies(vacancyResource, myself) {
          return vacancyResource.list({owner: myself._id});
        }
      }
    })
    .state('app.candidates', {
      url: '/vacancies/:id/candidates',
      template: candidateTemplate,
      controller: 'CandidatesController',
      controllerAs: 'vm',
      data: {
        requiresLogin: true,
        pageTitle: 'Candidates'
      },
      resolve: {
        subscriptionResource: 'subscriptionResource',

        subscriptions(subscriptionResource, $stateParams) {
          return subscriptionResource.list({vacancy: $stateParams.id});
        }
      }
    })
    .state('app.candidates.grid', {
      template: gridViewCandidatesTemplate
    })
    .state('app.candidates.list', {
      template: listViewCandidatesTemplate
    });
})
.controller('CandidatesController', candidatesController)
.controller('CandidatesDashboardController', candidatesDashboardController)
.controller('InterviewSetupModalCtrl', interviewSetupController)
.filter('queryFilter', subscribersFilter);

export default candidatesModule;
