

angular.module('projectServices', ['ngResource']).
    factory('Project', function($resource){
    var Project = $resource('api/projects/:projectId',
        {},
        {
            query: {method:'GET', params:{projectId: ''}, isArray:true},
            update: {method: 'PUT'}
        });

    Project.prototype.update = function(cb){
        return Project.update({id: this._id.$oid},
            angular.extend({}, this, {_id:undefined}), cb);
    };

    Project.prototype.destroy = function(cb) {
        return Project.remove({id: this._id.$oid}, cb);
      };

    return Project;

    });

angular.module('tasklistServices', ['ngResource']).
    factory('TaskList', function($resource){
        var TaskList = $resource('api/tasklists/:tasklistId', {}, {
            query: {method:'GET', params:{tasklistId: ''}, isArray:true},
            update: {method: 'PUT'}
        });



        TaskList.prototype.update = function(cb){
            alert(this._id.$oid);
            return TaskList.update({id: this._id.$oid},
                    angular.extend({}, this, {_id:undefined}), cb);

        };

        TaskList.prototype.destroy = function(cb) {
            return TaskList.remove({id: this._id.$oid}, cb);
        };

        return TaskList;
    });

angular.module('taskServices', ['ngResource']).
    factory('Task', function($resource){
        var Task = $resource('api/tasks/:taskId', {}, {
            query: {method:'GET', params:{taskId: ''}, isArray:true}
        });


        // Task.prototype.update = function(cb){
        //     alert(this._id.$oid);
        //     return Task.update({id: this._id.$oid},
        //             angular.extend({}, this, {_id:undefined}), cb);

        // };

        // Task.prototype.destroy = function(cb) {
        //     return Task.remove({id: this._id.$oid}, cb);
        // };

        return Task;

    });

angular.module('tokenServices', ['ngResource']).
    factory('Token', function($resource){
  return $resource('api/tokens', {}, {
    query: {method:'GET', params:{}, isArray:true}
  });
});

