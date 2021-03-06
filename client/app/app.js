import angular from 'angular';
import 'angular-ui-router';
import 'angular-jwt';
import 'angular-storage';
import 'angular-messages';
import 'angular-material';
import 'angular-loading-bar';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import entryTemplate from './entry.tpl.html';
import mainTemplate from './main.tpl.html';

angular.module('app', [
    'ui.router',
    'angular-jwt',
    'angular-storage',
    'ngMessages',
    'ngMaterial',
    'angular-loading-bar',
    Common.name,
    Components.name
  ])
  .constant('config', {
    'API_URL': 'http://localhost:3000',
    'ROOT_DIR': 'app',
    'CONF_URL': 'https://192.168.1.103:8123/interviewroom',
    states: {
      CALENDAR: 'app.calendar',
      CANDIDATES_GRID: 'app.candidates.grid'
    }
  })
  .config(($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider, jwtInterceptorProvider, RestangularProvider, cfpLoadingBarProvider) => {
    "ngInject";

    RestangularProvider.setBaseUrl('http://localhost:3000/api/v1');

    RestangularProvider.setRestangularFields({
      id: "_id"
    });

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/login');

    jwtInterceptorProvider.tokenGetter = function(store) {
      return store.get('jwt');
    };

    $httpProvider.interceptors.push('jwtInterceptor');

    // angular loading bar config
    cfpLoadingBarProvider.includeSpinner = false;

    $stateProvider
      .state('intro', {
        abstract: true,
        template: entryTemplate
      })
      .state('app', {
        abstract: true,
        template: mainTemplate,
        resolve: {
          metaResource: 'metaResource',
          authService: 'authService',

          myself(authService) {
            return authService.me();
          },

          countries(metaResource) {
            return metaResource.getCountries();
          },

          categories(metaResource) {
            return metaResource.getCategories();
          },

          positions(metaResource) {
            return metaResource.getVacancyPosition();
          },

          vacancyTypes(metaResource) {
            return metaResource.getVacancyType();
          }
        }
      });
  })
  .run(($rootScope, $state, store, jwtHelper) => {
    "ngInject";

    $rootScope.$on('$stateChangeStart', function(e, to, params) {
      if(to.data && to.data.requiresLogin) {
        if(!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
          e.preventDefault();
          $state.go('intro.login');
        }
      }

      if(to.redirectTo) {
        e.preventDefault();
        $state.go(to.redirectTo, params);
      }
    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      if (angular.isDefined(toState.data.pageTitle)) {
        $rootScope.pageTitle = toState.data.pageTitle + ' | interviewr';
        $rootScope.pageName = toState.data.pageTitle;
      }
    });
  })

  .component('app', AppComponent);
