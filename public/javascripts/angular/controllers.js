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
    Project.save(post_data, function(json) {
        if(json.stat == 'ok'){
          hide("projectForm");
          $scope.projects[json.project.id] = json.project;
          $scope.newProject = new Project();
        }
    });
  };

  $scope.delete = function(id){
    var r=confirm("Are you sure you want to delete this project?");
      if (r!=true)
      {
        return;
      }

    Project.remove({id:id}, function(json){
      if(json.stat == 'ok'){
        delete $scope.projects[json.project.id];
      }
    });
  };

}

function UserListCtrl($scope, User) {
  $scope.newUser = new User();
  $scope.users = {};

  User.query(function(json){
    if(json.stat == 'ok')
    {
      json.users.forEach(function(user){
        $scope.users[user.id] = user;
      });
    }
  });

  $scope.save = function() {
    var post_data = {username: $scope.newUser.username, email: $scope.newUser.email, password:$scope.newUser.password};
    User.save(post_data, function(json) {
        if(json.stat == 'ok'){
          hide("userForm");
          $scope.users[json.user.id] = json.user;
          $scope.newUser = new User();
        }
    });
  };

}



function ProjectDetailCtrl($scope, $http, $location,  $routeParams, Project, TaskList, Task) {
  $scope.orderProp = 'id';
  $scope.newTasklist = new TaskList();

  Project.get({id: $routeParams.projectId}, function(json) {
    if(json.stat == 'ok'){
      // $scope.projectId = $routeParams.projectId;
      $scope.project = json.project;
      // $scope.tasks = {};
      $scope.tasklists = [];
      for(var k in json.tasklists){
        var v = json.tasklists[k];
        $scope.tasklists.push(json.tasklists[k]);
      }
    }
     
  });

  $scope.saveTaskList = function(){

    var post_data = {title: $scope.newTasklist.title, 
      projectId: $scope.project.id};
    if($scope.newTasklist.title==undefined){
      return;
    }
      
    TaskList.save(post_data, function(json){
        if(json.stat == "ok")
        {
          hide("tasklistForm");
          // $scope.tasklists[json.tasklist.id] = json.tasklist;
          $scope.tasklists.push(json.tasklist);
        }
      });
  };
  
}

 

function TaskListDetailCtrl($scope, $routeParams, TaskList, Task) {
  TaskList.get({projectId: $routeParams.projectId, tasklistId: $routeParams.tasklistId}, function(json) {
      if(json.stat == 'ok'){
        $scope.tasklist = json.tasklist;
        $scope.project = json.project;
      }else{

      }
  });

}

function TaskDetailCtrl($scope, $routeParams, Task) {
  Task.get({projectId: $routeParams.projectId, taskId: $routeParams.taskId}, function(json) {
    if(json.stat == 'ok'){
      $scope.project = json.project;
      $scope.tasklist = json.tasklist;
      $scope.task = json.task;
    }else{

    }
  });

}

function ProjectTemplateCtrl($scope, $http, $routeParams, Project, TaskList, Task){

  $scope.saveTaskList = function(){

    var post_data = {title: $scope.newTasklist.title, 
      projectId: $scope.projectId};
    if($scope.newTasklist.title==undefined){
      return;
    }
      
    TaskList.save(post_data, function(json){
        if(json.stat == "ok")
        {
          hide("tasklistForm");
          // $scope.tasklists[json.tasklist.id] = json.tasklist;
          $scope.tasklists.push(json.tasklist);
        }
      });
  };

}

function TasklistTemplateCtrl($scope, $http, $routeParams, Task){
  $scope.newTask = new Task();


  $scope.taskSave = function(){
    var post_data = {title: $scope.newTask.title, 
        projectId: $scope.project.id, tasklistId: $scope.tasklist.id };
    if($scope.newTask.title==undefined){
      return;
    }
    Task.save(post_data, function(json){
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

  $scope.tasklistDelete = function(){
      var r=confirm("Are you sure you want to delete this tasklist?");
      if (r!=true)
      {
        return;
      }
      var tasklistId = $scope.tasklist.id;
      var projectId = $scope.project.id;
      $http({method: 'DELETE', url: "/tasklists/"+$scope.tasklist.id, data:{projectId: $scope.project.id}}).
        success(function(json, status) {
          if(json.stat == "ok"){
            if($scope.tasklists == null){
              window.location = "#/projects/"+projectId;
            }
            else{
              var tls = $scope.tasklists;
              var index = findArrayIndex(tls, $scope.tasklist.id);
              if (index != -1){
                Array.remove(tls, index);
              }
            }
          }
        }).
        error(function(json, status) {
         
      });
    };


  $scope.tasklistUpdate = function(){
      var title = $scope.title;
      $http({method: 'PUT', url: "/tasklists/"+$scope.tasklist.id, data: {title: $scope.title, projectId: $scope.tasklist.projectId}}).
        success(function(json, status) {
          if(json.stat == "ok"){
            $scope.tasklist.title = $scope.title;
            hide("tasklistEditForm"+$scope.tasklist.id);
          }
        }).
        error(function(json, status) {
         
      });
  };


}





function TaskTemplateCtrl($scope, $http, $routeParams, Task){


  $scope.assigned = function(){
    // if ($scope.task.updatedAt != undefined){
    //   return 'show';
    // }
    // else
    {
      return 'hide';
    }
  };

  $scope.showAssign = function(){
    if ($scope.task != undefined){
      var as = "";
      if($scope.task.userName != undefined){
          as = $scope.task.userName;
      }
      
      if($scope.task.planedAt != undefined){
        var planedAt = new Date($scope.task.planedAt);
        as += " " + dateToYMD(planedAt);
      }else{
        as = "Unassigned";
      }
      return as;
    }else{
      return 'Unassigned';
    }
  };

  $scope.showComplete = function(){
    var as = "";
    if ($scope.task != undefined){
      var username = "";
      if($scope.task.userName != undefined){
          username = $scope.task.userName;
      }
      if($scope.task.completedAt != undefined){
        var completedAt = new Date($scope.task.completedAt);
        as ="(Completed by " + username + " on " + dateToYMD(completedAt) + ")"; 
      }
    }
    return as;
  };
  // $scope.taskAssign = showAssign();
  

  $scope.assign = function(){
    var taskId = $scope.task.id;
    var id = "#assignTask"+taskId;
    $(id).datepicker('show')
      .on('changeDate', function(ev){
        var planedAt = "";
        if(ev.date != undefined){
          var dt = new Date(ev.date);
          planedAt = dateToYMD(ev.date);
        }else{
          $scope.task.planedAt = undefined;
        }
        
        $http({method: 'PUT', url: "/tasks/"+$scope.task.id, data: {projectId: $scope.project.id, planedAt: planedAt}}).
          success(function(data, status) {
            if(data.stat == "ok"){
              $(id).text($scope.task.planedAt);
              // $(id).show();
              // $(id).removeClass('hide');
              $(id).datepicker('hide');
            }
          }).
          error(function(data, status) {
           
        });

        
       
    });
  };



  $scope.taskDone = function(task){
      $http({method: 'PUT', url: "/tasks/"+task.id, data: {projectId: $scope.project.id, status: task.status}}).
        success(function(data, status) {
          if(data.stat == "ok"){

          }
        }).
        error(function(data, status) {
         
      });
    };

  $scope.taskDelete = function(){
      var r=confirm("Are you sure you want to delete this task?");
      if (r!=true)
      {
        return;
      }
      var tasklistId = $scope.task.tasklistId;
      var taskId = $scope.task.id;
      var projectId = $scope.task.id;
      $http({method: 'DELETE', url: "/tasks/"+taskId, data:{projectId: projectId}}).
        success(function(json, status) {
          if(json.stat == "ok"){
            if($scope.tasklist == null){
              window.location = "#/projects/"+$scope.project.id+"/tasklists/"+tasklistId;
            }
            else{
              var tls = $scope.tasklist;
              var index = findArrayIndex(tls.tasks, taskId);
              if (index != -1){
                Array.remove(tls.tasks, index);
              }
            }
          }
        }).
        error(function(json, status) {
         
      });
    };



   $scope.taskUpdate = function(task){
      var title = $scope.title;
      if(title == "" || title == null){
        return;
      }

      $http({method: 'PUT', url: "/tasks/"+task.id, data: {title: title, projectId:task.projectId, tasklistId: task.tasklistId}}).
        success(function(json, status) {
          if(json.stat == "ok"){
            $scope.task.title = $scope.title;
            hide("taskEditForm"+$scope.task.id);
          }
          
        }).
        error(function(json, status) {
         
      });
  };
  

}



function TopicListCtrl($scope, $http, $routeParams, Project){



}

function TopicDetailCtrl($scope, $http, $routeParams, Project){



}

function ProjectSettingsCtrl($scope, $http, $routeParams, Project, Member){
  $scope.errors = "";
  $scope.newProjectUser = new Member();

  $scope.members = [];
 
  $http({method: 'GET', url: "/projects/"+$routeParams.projectId+"/members"}).
        success(function(json, status) {
          if(json.stat == 'ok'){
            $scope.project = json.project;
            $scope.title = $scope.project.title;
            $scope.members = json.members;
          }          
        }).
        error(function(json, status) {
         
      });

  $scope.save = function() {
    var title = $scope.title;
    $http({method: 'PUT', url: "/projects/"+$scope.project.id, data: {title: $scope.title}}).
      success(function(json, status) {
        if(json.stat == "ok"){
          $scope.project.title = $scope.title;
          hide("projectEditForm");
        }
      }).
      error(function(json, status) {
       
    });


  };


  $scope.memberSave = function() {
    $scope.errors = "";
    var post_data = {projectId: $scope.project.id, email: $scope.newProjectUser.email};
    Member.save(post_data, function(json) {
        if(json.stat == 'ok'){
          hide("memberForm");
          $scope.members.push(json.member);
          $scope.newMember = new Member();
        }else{
          $scope.errors = json.error;
        }
    });
  };


  $scope.memberRemove = function(memberId){
      var r=confirm("Are you sure you want to remove the member?");
      if (r!=true)
      {
        return;
      }
      var projectId = $scope.project.id;
      $http({method: 'DELETE', url: "/members/"+memberId, data:{projectId: projectId}}).
        success(function(json, status) {
          if(json.stat == "ok"){
              var index = findArrayIndex($scope.members, memberId);
              if (index != -1){
                Array.remove($scope.members, index);
              }
          }
        }).
        error(function(json, status) {
         
      });
    };

}