function LayoutSidebarController($scope) {
  const vm = this;

  vm.items = [{
    name: 'Interview Room',
    icon: 'fa fa-video-camera',
    state: 'app.iroom'
  },
  {
    name: 'Vacancies',
    icon: 'fa fa-newspaper-o',
    state: 'app.vacanciesList'
  },
  {
    name: 'Calendar',
    icon: 'fa fa-calendar',
    state: 'app.calendar'
  },
  {
    name: 'Companies',
    icon: 'fa fa-building-o',
    state: 'app.companies'
  }];

  vm.company = [{
    name: 'My Companies',
    icon: 'fa fa-hospital-o',
    state: 'app.manageCompany'
  },
  {
    name: 'Candidates',
    icon: 'fa fa-users',
    state: 'app.candidatesDashboard'
  },
  {
    name: 'Vacancy',
    icon: 'fa fa-newspaper-o',
    state: 'app.vacanciesManage.companies'
  }];
}

export default LayoutSidebarController;
