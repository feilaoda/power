
var power = angular.module('power', ['projectFilters', 'projectServices', 'tasklistServices', 'taskServices', 'userServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/projects', {templateUrl: 'views/project-list.html',   controller: ProjectListCtrl}).
      when('/projects/:projectId', {templateUrl: 'views/project-detail.html', controller: ProjectDetailCtrl}).
      when('/projects/:projectId/tasklists/:tasklistId', {templateUrl: 'views/tasklist-detail.html', controller: TaskListDetailCtrl}).
      when('/projects/:projectId/tasks/:taskId', {templateUrl: 'views/task-detail.html', controller: TaskDetailCtrl}).
      when('/users', {templateUrl: 'views/user-list.html',   controller: UserListCtrl}).
      otherwise({redirectTo: '/projects'});
}]);


power.directive('tasklist', function(){
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      scope: {tasklist:'=', project:'='},
      templateUrl:'views/tasklist-template.html' ,
      controller: TasklistTemplateCtrl,
      // The linking function will add behavior to the template
      link: function(scope, element, attrs) {
      }
    }
}).directive('task', function(){
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      scope: {task:'=', tasklist:'=', project:'='},
      templateUrl:'views/task-template.html' ,
      controller: TaskTemplateCtrl,
      // The linking function will add behavior to the template
      link: function(scope, element, attrs) {
      }
    }
}).directive('taskEditTemplate', function(){
    return {
      restrict: 'C',
      replace: false,
      transclude: true,
      scope: {task:'=task', tasklist:'=tasklist', project:'=project'},
      templateUrl:'views/task-edit-template.html' ,
      controller: TaskEditTemplateCtrl,
      // The linking function will add behavior to the template
      link: function(scope, element, attrs) {
      }
    }
});
