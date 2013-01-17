var __defineStaticProperty = function(clazz, key, value) {
  if (typeof clazz.__defineStaticProperty == 'function') return clazz.__defineStaticProperty(key, value);
  return clazz[key] = value;
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

App.User = (function(_super) {
  var User;

  function User() {
    return User.__super__.constructor.apply(this, arguments);
  }

  User = __extends(User, _super);

  User.field('username', {
    type: 'String'
  });

  User.field('email', {
    type: 'String'
  });

  User.field('password', {
    type: 'String'
  });

  User.field('displayName', {
    type: 'String'
  });

  User.timestamps();

  User.hasMany('projects');

  User.hasMany('tasklists');

  User.hasMany('tasks');

  __defineStaticProperty(User,  "findOrCreateFromSession", function(data, callback) {
    var _this = this;
    console.log("create", data);
    return this.findFromSession(data, function(error, user) {
      if (!error && user && user instanceof Tower.Model) {
        return callback.call(_this, error, user);
      } else {
        return _this.createFromSession(data, callback);
      }
    });
  });

  __defineStaticProperty(User,  "findFromSession", function(data, callback) {
    var accessToken, provider, username,
      _this = this;
    provider = data.provider;
    accessToken = data.credentials['accessToken'];
    username = data.info['username'];
    return App.Token.where({
      provider: provider,
      accessToken: accessToken
    }).first(function(error, token) {
      if (error || token === null) {
        App.Account.where({
          provider: provider,
          name: username
        }).first(function(error, account) {
          if (error || account === null) {
            return callback.call(_this, error, null);
          }
          return App.User.find(account.get('userId'), function(error, user) {
            return callback.call(_this, error, user);
          });
        });
        return;
      }
      return App.User.find(token.get('userId'), function(error, user) {
        return callback.call(_this, error, user);
      });
    });
  });

  __defineStaticProperty(User,  "createFromSession", function(data, callback) {
    var email, emails, provider, username,
      _this = this;
    username = '';
    provider = data.provider;
    if (provider === 'github') {
      username = data.info['username'];
    }
    this.user = App.User.build();
    this.user.set('username', username);
    emails = data.info['emails'];
    console.log(data.info);
    email = "";
    if (emails !== null && emails.length > 0) {
      email = emails[0]['value'];
    }
    this.user.set('email', email);
    this.user.set('displayName', data.info['displayName']);
    return this.user.save(function(error) {
      var attrs, attrs2;
      if (error) {
        return _this.render({
          json: {
            stat: 'fail'
          }
        });
      }
      attrs = {};
      attrs['provider'] = data.provider;
      attrs['accessToken'] = data.credentials['accessToken'];
      attrs['userId'] = _this.user.get('id');
      attrs['name'] = username;
      App.Token.create(attrs, function(error, token) {
        if (error || token === null) {
          return callback.call(_this, error, null);
        }
        return callback.call(_this, error, _this.user);
      });
      attrs2 = {};
      attrs2['provider'] = provider;
      attrs2['userId'] = _this.user.get('id');
      attrs2['name'] = username;
      return App.Account.where({
        provider: provider,
        name: username
      }).first(function(error, account) {
        var attrs3;
        if (account === null) {
          App.Account.create(attrs2, function(error, newAccount) {});
        }
        attrs3 = {};
        attrs3['userId'] = _this.user.get('id');
        return App.Account.updateAttributes(attrs3, function(error) {
          return true;
        });
      });
    });
  });

  return User;

})(Tower.Model);
