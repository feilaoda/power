var __defineProperty = function(clazz, key, value) {
  if (typeof clazz.__defineProperty == 'function') return clazz.__defineProperty(key, value);
  return clazz.prototype[key] = value;
},
  __hasProp = {}.hasOwnProperty,
  __extends =   function(child, parent) {
    if (typeof parent.__extend == 'function') return parent.__extend(child);
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } 
    function ctor() { this.constructor = child; } 
    ctor.prototype = parent.prototype; 
    child.prototype = new ctor; 
    child.__super__ = parent.prototype; 
    if (typeof parent.extended == 'function') parent.extended(child); 
    return child; 
};

App.MembersController = (function(_super) {
  var MembersController;

  function MembersController() {
    return MembersController.__super__.constructor.apply(this, arguments);
  }

  MembersController = __extends(MembersController, _super);

  MembersController.scope('all');

  __defineProperty(MembersController,  "index", function() {
    var _this = this;
    return App.Member.find(this.params.id(function(error, member) {
      if (error) {
        return _this.render({
          json: {
            stat: 'fail',
            error: error
          }
        });
      }
      console.log(member);
      return _this.render({
        json: {
          stat: 'ok',
          project: _this.project,
          member: member
        }
      });
    }));
  });

  __defineProperty(MembersController,  "create", function() {
    var _this = this;
    console.log(this.params);
    this.member = App.Member.build();
    return App.Project.find(this.params.projectId, function(error, project) {
      if (error || project === null) {
        return _this.render({
          json: {
            stat: '404',
            error: 'project not found'
          }
        });
      }
      _this.project = project;
      return App.User.where({
        email: _this.params.email
      }).first(function(error, user) {
        if (error || user === null) {
          return _this.render({
            json: {
              stat: '404',
              error: 'user not found'
            }
          });
        }
        _this.user = user;
        return App.Member.where({
          projectId: _this.params.projectId,
          userId: user.get('id')
        }).first(function(error, member) {
          if (error || member !== null) {
            return _this.render({
              json: {
                stat: 'fail',
                error: 'user already exist'
              }
            });
          }
          _this.member.set('projectId', _this.project.get('id'));
          _this.member.set('userId', user.get('id'));
          _this.member.set('email', _this.params.email);
          _this.member.set('username', _this.user.get('username'));
          return _this.member.save(function(error) {
            if (error) {
              return _this.render({
                json: {
                  stat: 'fail'
                }
              });
            } else {
              return _this.render({
                json: {
                  stat: 'ok',
                  member: _this.member
                }
              });
            }
          });
        });
      });
    });
  });

  __defineProperty(MembersController,  "destroy", function() {
    var _this = this;
    console.log(this.params);
    return App.Member.find(this.params.id, function(error, member) {
      if (error || member === null) {
        return _this.render({
          json: {
            stat: '404',
            error: 'member  not found'
          }
        });
      }
      _this.member = member;
      return App.Project.find(_this.params.projectId, function(error, project) {
        if (error || project === null) {
          return _this.render({
            json: {
              stat: '404',
              error: 'project  not found'
            }
          });
        }
        return _this.member.destroy(function(error) {
          if (error) {
            return _this.render({
              json: {
                stat: 'fail',
                error: error
              }
            });
          }
          return _this.render({
            json: {
              stat: 'ok'
            }
          });
        });
      });
    });
  });

  return MembersController;

})(App.ApplicationController);
