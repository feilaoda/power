

angular.module('projectServices', ['ngResource']).
    factory('Phone', function($resource){
  return $resource('api/projects/:projectId.json', {}, {
    query: {method:'GET', params:{projectId: 'all'}, isArray:true}
  });
});


