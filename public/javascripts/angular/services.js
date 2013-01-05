

angular.module('projectServices', ['ngResource']).
    factory('Project', function($resource){
        var Project = $resource('projects/:id',{},
            {
                get: {method:'GET', params:{id: ''}},
                query: {method:'GET', params:{id: ''}},
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
        var TaskList = $resource('tasklists/:tasklistId', {}, {
            get: {method:'GET', params:{tasklistId: ''}},
            query: {method:'GET', params:{tasklistId: ''}, isArray:true},
            update: {method: 'PUT'},
            save: {method: 'POST', params:{id:''}},
        });

        TaskList.prototype.save = function(cb){
            alert(this._id.$oid);
            return TaskList.save({id: this._id.$oid},
                    angular.extend({}, this, {_id:undefined}), cb);

        };

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
        var Task = $resource('tasks/:taskId', {}, {
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

angular.module('userServices', ['ngResource']).
    factory('User', function($resource){
        var User = $resource('users/:userId', {}, {
            query: {method:'GET', params:{userId: ''}}
        });


        // User.prototype.update = function(cb){
        //     alert(this._id.$oid);
        //     return User.update({id: this._id.$oid},
        //             angular.extend({}, this, {_id:undefined}), cb);

        // };

        // User.prototype.destroy = function(cb) {
        //     return User.remove({id: this._id.$oid}, cb);
        // };

        return User;

    });

