var now = new Date();

var version = '?v='+ now.getTime();

var power = angular.module('power', ['projectFilters', 'projectServices', 'tasklistServices', 'taskServices', 'userServices', 'memberServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/projects', {templateUrl: 'views/project-list.html'  + version,   controller: ProjectListCtrl}).
      when('/projects/:projectId', {templateUrl: 'views/project-detail.html' + version, controller: ProjectDetailCtrl}).
      when('/projects/:projectId/tasklists/:tasklistId', {templateUrl: 'views/tasklist-detail.html'  + version, controller: TaskListDetailCtrl}).
      when('/projects/:projectId/tasks/:taskId', {templateUrl: 'views/task-detail.html' + version, controller: TaskDetailCtrl}).
      when('/projects/:projectId/topics', {templateUrl: 'views/topic-list.html'  + version, controller: TopicListCtrl}).
      when('/projects/:projectId/topics/:topicId', {templateUrl: 'views/topic-detail.html'  + version, controller: TopicDetailCtrl}).
      when('/projects/:projectId/settings', {templateUrl: 'views/project-settings.html'  + version, controller: ProjectSettingsCtrl}).
      when('/users', {templateUrl: 'views/user-list.html',   controller: UserListCtrl}).
      otherwise({redirectTo: '/projects'});
}]);



power.directive('project', function(){
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      scope: {tasklists:'=', project:'=', title:'@projectTitle'},
      templateUrl:'views/project-template.html' + version ,
      controller: ProjectTemplateCtrl,
      link: function(scope, element, attrs) {
      }
    };
}).directive('tasklist', function(){
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      scope: {tasklist:'=', tasklists:'=', project:'=', title:'@tasklistTitle'},
      templateUrl:'views/tasklist-template.html' + version ,
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
      templateUrl:'views/task-template.html' + version,
      controller: TaskTemplateCtrl,
      link: function(scope, element, attrs) {

      }
    };
}).directive('navbar', function(){
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      scope: {project:'=', active:'@active'},
      templateUrl:'views/navbar-template.html' + version ,
      
    };
});
