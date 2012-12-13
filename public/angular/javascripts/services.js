

angular.module('projectServices', ['ngResource']).
    factory('Phone', function($resource){
  return $resource('api/projects/:projectId.json', {}, {
    query: {method:'GET', params:{projectId: 'all'}, isArray:true}
  });
});

angular.module('tasklistServices', ['ngResource']).
    factory('Phone', function($resource){
  return $resource('api/tasklists/:tasklistId.json', {}, {
    query: {method:'GET', params:{tasklistId: 'all'}, isArray:true}
  });
});
