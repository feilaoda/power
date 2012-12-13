
angular.module('powerproject', ['projectFilters', 'projectServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/projects', {templateUrl: 'partials/project-list.html',   controller: PhoneListCtrl}).
      when('/projects/:phoneId', {templateUrl: 'partials/project-detail.html', controller: PhoneDetailCtrl}).
      otherwise({redirectTo: '/projects'});
}]);
