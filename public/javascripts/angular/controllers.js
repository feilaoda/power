Array.remove = function(array, from, to) {
  var rest = array.slice((to || from) + 1 || array.length);
  array.length = from < 0 ? array.length + from : from;
  return array.push.apply(array, rest);
};

function findArrayIndex(array, id){
  var index = -1;
  var len = array.length;
  for(var i=0; i<len; i++){
    if (id == array[i].id){
      index = i;
      break;
    }
  }
  return index;
}

function ProjectListCtrl($scope, Project) {
  $scope.projects = {};

  Project.query(function(json){
    if(json.stat == 'ok')
    {
      json.projects.forEach(function(project){
        $scope.projects[project.id] = project;
      });
    }
  });

  $scope.newProject = new Project();
  $scope.orderProp = '-id';

  $scope.save = function() {
    
    var post_data = {title: $scope.newProject.title};
    alert(post_data.title);
    Project.save(post_data, function(json) {
        if(json.stat == 'ok'){
          hide("projectForm");
          $scope.projects[json.project.id] = json.project;
          $scope.newProject = new Project();
        }
    });
  };

  $scope.delete = function(id){



    Project.remove({id:id}, function(json){
      if(json.stat == 'ok'){
        delete $scope.projects[json.project.id];
      }
    });
  };

}

function UserListCtrl($scope, User) {

}



function ProjectDetailCtrl($scope, $http, $location,  $routeParams, Project, TaskList, Task) {
  $scope.orderProp = 'id';

  Project.get({id: $routeParams.projectId}, function(json) {
    $scope.model = json;
    $scope.projectId = $routeParams.projectId;
    $scope.newTasklist = new TaskList();
    $scope.project = json.project;
    $scope.tasks = {};
    $scope.tasklists = json.tasklists;
    
    for(var k in json.tasklists){
      var v = json.tasklists[k];
      $scope.tasks[v.id] = new Task();
    }

     
  });

  // $scope.taskDone = function(task){
  //   $http({method: 'POST', url: "/tasks/"+task.id+"/changes", data: {projectId: $scope.projectId, status: task.status}}).
  //     success(function(data, status) {
  //       if(data.stat == "ok"){

  //       }
        
  //     }).
  //     error(function(data, status) {
       
  //   });
  // };

  // $scope.taskDelete = function(task){
  //   var r=confirm("Are you sure you want to delete this task?");
  //   if (r!=true)
  //   {
  //     return;
  //   }

  //   var tasklistId = task.tasklistId;
  //   var taskId = task.id;
  //   $http({method: 'DELETE', url: "/tasks/"+task.id, data:{projectId: $scope.projectId}}).
  //     success(function(json, status) {
  //       if(json.stat == "ok"){
  //         var tls = $scope.tasklists[tasklistId];
  //         var index = findArrayIndex(tls.tasks, taskId);
  //         if (index != -1){
  //           Array.remove(tls.tasks, index);
  //         }
          
  //       }
        
  //     }).
  //     error(function(json, status) {
       
  //   });
  // };

  // $scope.taskEdit = function(task){
  //   var tasklistId = task.id;
  //   $http({method: 'POST', url: "/tasks/"+task.id+"/changes", data: {status: task.status}}).
  //     success(function(data, status) {
  //       if(data.stat == "ok"){
  //         hide("taskForm"+tasklistId);
  //         //$("#taskForm"+tasklistId).hide();
  //       }
        
  //     }).
  //     error(function(data, status) {
       
  //   });
  // };

  $scope.saveTaskList = function(){

    var post_data = {title: $scope.newTasklist.title, 
      projectId: $scope.projectId};
    if($scope.newTasklist.title==undefined){
      return;
    }
      
    TaskList.save(post_data, function(json){
        if(json.stat == "ok")
        {
          $("#tasklistForm").hide();
          $scope.tasks[json.tasklist.id] = new Task();
          $scope.tasklists[json.tasklist.id] = json.tasklist;
        }
      });
  };

  $scope.saveTask = function(tasklistId){
    
    var post_data = {title: $scope.tasks[tasklistId].title, 
        projectId: $scope.projectId, tasklistId: tasklistId };

    if($scope.tasks[tasklistId].title==undefined){
      return;
    }

    Task.save(post_data, function(json){
        if(json.stat == "ok"){
          $scope.tasks[tasklistId].title = undefined;
          hide("taskForm"+tasklistId);

          if($scope.tasklists[tasklistId].tasks == undefined){
            $scope.tasklists[tasklistId].tasks = [json.task];
          }else
          {
            $scope.tasklists[tasklistId].tasks.push(json.task);
          }
        }
    });

  };



}

 

function TaskListDetailCtrl($scope, $routeParams, TaskList, Task) {
  $scope.projectId = $routeParams.projectId;
  $scope.tasklistId = $routeParams.tasklistId;


  TaskList.get({projectId: $routeParams.projectId, tasklistId: $routeParams.tasklistId}, function(json) {
      if(json.stat == 'ok'){
        $scope.tasklist = json.tasklist;
        $scope.project = json.project;
        $scope.newTask = new Task();
      }else{

      }
  });

  // $scope.saveTask = function(){
  //   var post_data = {title: $scope.newTask.title, 
  //       projectId: $scope.projectId, tasklistId: $scope.tasklistId };
  //   if($scope.newTask.title==undefined){
  //     return;
  //   }

  //   Task.save(post_data, function(json){
  //       //callback
  //       if(json.stat == "ok"){
  //         $scope.task = new Task();
  //         hide("taskForm");
  //         if($scope.tasklist.tasks == undefined){
  //           $scope.tasklist.tasks = [json.task];
  //         }else
  //         {
  //           $scope.tasklist.tasks.push(json.task);
  //         }
  //       }
  //   });
  // };

}

function TaskDetailCtrl($scope, $routeParams, Task) {
  $scope.projectId = $routeParams.projectId;
  Task.get({projectId: $routeParams.projectId, taskId: $routeParams.taskId}, function(json) {
    $scope.task = json.task;
  });

}


function TasklistTemplateCtrl($scope, $http,  $routeParams, Task){
  $scope.newTask = new Task();

  $scope.taskSave = function(){
    var post_data = {title: $scope.newTask.title, 
        projectId: $scope.project.id, tasklistId: $scope.tasklist.id };
    if($scope.newTask.title==undefined){
      return;
    }

    Task.save(post_data, function(json){
        //callback
        if(json.stat == "ok"){
          $scope.newTask = new Task();
          hide("taskForm"+$scope.tasklist.id);
          if($scope.tasklist.tasks == undefined){
            $scope.tasklist.tasks = [json.task];
          }else
          {
            $scope.tasklist.tasks.push(json.task);
          }
        }
    });
  };

}


function TaskEditTemplateCtrl($scope, $http,  $routeParams, Task){
  $scope.newTask = new Task();

 


  // $scope.taskEdit = function(){
  //   var post_data = {title: $scope.newTask.title, 
  //       projectId: $scope.project.id, tasklistId: $scope.tasklist.id };
  //   if($scope.newTask.title==undefined){
  //     return;
  //   }

  //   Task.save(post_data, function(json){
  //       //callback
  //       if(json.stat == "ok"){
  //         $scope.newTask = new Task();
  //         hide("taskForm"+$scope.tasklist.id);
  //         if($scope.tasklist.tasks == undefined){
  //           $scope.tasklist.tasks = [json.task];
  //         }else
  //         {
  //           $scope.tasklist.tasks.push(json.task);
  //         }
  //       }
  //   });
  // };

}




function TaskTemplateCtrl($scope, $http,  $routeParams, Task){
  $scope.newTask = new Task();
  $scope.editForm = '';
  
  $scope.taskDone = function(task){
      $http({method: 'POST', url: "/tasks/"+task.id+"/changes", data: {projectId: $scope.project.id, status: task.status}}).
        success(function(data, status) {
          if(data.stat == "ok"){

          }
        }).
        error(function(data, status) {
         
      });
    };

  $scope.taskDelete = function(task){
      var r=confirm("Are you sure you want to delete this task?");
      if (r!=true)
      {
        return;
      }
      var tasklistId = task.tasklistId;
      var taskId = task.id;
      $http({method: 'DELETE', url: "/tasks/"+task.id, data:{projectId: $scope.project.id}}).
        success(function(json, status) {
          if(json.stat == "ok"){
            var tls = $scope.tasklist;
            var index = findArrayIndex(tls.tasks, taskId);
            if (index != -1){
              Array.remove(tls.tasks, index);
            }
          }
        }).
        error(function(json, status) {
         
      });
    };

   $scope.taskEdit = function(task){
      //$("#taskEditForm"+task.id).html('<div class="taskEditTemplate" task="task" tasklist="tasklist" project="project"></div>');
      $scope.editForm = '<div class="taskEditTemplate" task="task" tasklist="tasklist" project="project"></div>';

    };


   $scope.taskUpdate = function(task){
      var tasklistId = task.id;
      $http({method: 'POST', url: "/tasks/"+task.id+"/changes", data: {title: task.title}}).
        success(function(json, status) {
          if(json.stat == "ok"){
            hide("taskForm"+tasklistId);
            //$("#taskForm"+tasklistId).hide();
          }
          
        }).
        error(function(json, status) {
         
      });
  };
  

}
