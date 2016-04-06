import angular from 'angular';
import userResource from './User';
import companyResource from './Company';
import vacancyResource from './Vacancy';
import metaResource from './Meta';
import interviewResource from './Interview';
import subscriptionResource from './Subscription';

let resourcesModule = angular.module('resources', [])
.factory('userResource', userResource)
.factory('companyResource', companyResource)
.factory('vacancyResource', vacancyResource)
.factory('metaResource', metaResource)
.factory('interviewResource', interviewResource)
.factory('subscriptionResource', subscriptionResource);

export default resourcesModule;
