
angular.module('powerproject', ['projectFilters', 'projectServices', 'tasklistServices', 'taskServices', 'tokenServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/projects', {templateUrl: 'partials/project-list.html',   controller: PhoneListCtrl}).
      when('/projects/:projectId', {templateUrl: 'partials/project-detail.html', controller: ProjectDetailCtrl}).
      when('/projects/:projectId/tasklists/:tasklistId', {templateUrl: 'partials/tasklist-detail.html', controller: TaskListDetailCtrl}).
      when('/projects/:projectId/tasks/:taskId', {templateUrl: 'partials/task-detail.html', controller: TaskDetailCtrl}).
      otherwise({redirectTo: '/projects'});
}]);
