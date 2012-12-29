
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

var now = new Date();

power.directive('tasklist', function(){
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      scope: {tasklist:'=', tasklists:'=', project:'=', title:'@tasklistTitle'},
      templateUrl:'views/tasklist-template.html' ,
      controller: TasklistTemplateCtrl,
      link: function(scope, element, attrs) {
      }
    };
}).directive('task', function(){
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      scope: {task:'=', tasklist:'=', project:'=', title:'@taskTitle'},
      templateUrl:'views/task-template.html', //+'?t='+ now.getTime(),
      controller: TaskTemplateCtrl,
      link: function(scope, element, attrs) {

      }
    };
});
