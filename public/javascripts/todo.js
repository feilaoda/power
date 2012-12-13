

// place your application-wide javascripts here
function TodoCtrl($scope) {
  $scope.todos = [
    {text:'learn angular', done:true},
    {text:'build an angular app', done:false}];
 
  $scope.addTodo = function() {
    $scope.todos.push({text:$scope.todoText, done:false});
    $scope.todoText = '';
  };
 
  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };
 
  $scope.archive = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
  };
}


function ProjectController($scope, $routeParams, $http) {

}

// place your application-wide javascripts here
function TaskListController($scope, $routeParams, $http) {

 $http.get('/projects/' + $routeParams.projectId + '.json').success(function(data) {
    $scope.project = data;
  });

    $scope.link_to = function(title, link, class=undefined){
        return '<a href="'+link+'">'+title+"</a>";
    };

  $scope.pathto_project_tasklist = function(projectId, tasklistId){
    return "/projects/"+projectId+"/tasklists/"+tasklistId;
  };

  $scope.tasklists = [
    {title:'learn angular', done:true},
    {title:'build an angular app', done:false}];
 
  $scope.addTaskList = function() {
    $scope.tasklists.push({title:$scope.todoText, done:false});
    $scope.todoText = '';
  };

  $scope.taskDone = function(tasklist){
    return tasklist.status == 'done';
  };
 
  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.tasklists, function(tasklist) {
      count += tasklist.done ? 0 : 1;
    });
    return count;
  };
 
 
}



