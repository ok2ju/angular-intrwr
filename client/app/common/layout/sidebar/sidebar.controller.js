function LayoutSidebarController() {
  const vm = this;

  vm.items = [{
    name: 'Interview Room',
    icon: 'icon-videocam',
    state: 'app.iroom'
  },
  {
    name: 'Vacancies',
    icon: 'icon-newspaper',
    state: 'app.vacanciesList'
  },
  {
    name: 'Calendar',
    icon: 'icon-calendar',
    state: 'app.calendar'
  },
  {
    name: 'Companies',
    icon: 'icon-building',
    state: 'app.companies'
  }];

  vm.company = [{
    name: 'My Companies',
    icon: 'icon-hospital',
    state: 'app.manageCompany'
  },
  {
    name: 'Candidates',
    icon: 'icon-users',
    state: 'app.candidatesDashboard'
  },
  {
    name: 'Vacancy',
    icon: 'icon-newspaper',
    state: 'app.vacanciesManage.companies'
  }];
}

export default LayoutSidebarController;
