exports.routes = function (map) {


    map.resources('projects', function (project) {
        project.resources('tasklists');
    });

    map.resources('projects', function (project) {
        project.resources('tasks');
    });

    map.resources('tasklists');
    map.resources('users');
    map.resources('tasks');
    map.resources('projects');

    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');
};