// Generated by CoffeeScript 1.6.3
(function() {
  var App, Glue, Gui, Provider, UseCase,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Gui = (function() {
    function Gui() {
      this.showMyElem = __bind(this.showMyElem, this);
      this.createElementFor = __bind(this.createElementFor, this);
    }

    Gui.prototype.createElementFor = function(templateId, data) {
      var element, html, source, template;
      source = $(templateId).html();
      template = Handlebars.compile(source);
      html = template(data);
      return element = $(html);
    };

    Gui.prototype.showMyElem = function(data) {
      var element;
      element = this.createElementFor("#abc-template", {
        posts: data
      });
      return $(".main").append(element);
    };

    return Gui;

  })();

  Provider = (function() {
    function Provider() {
      this.getUserData = __bind(this.getUserData, this);
      this.providedUserData = __bind(this.providedUserData, this);
      this.getUserDataOld = __bind(this.getUserDataOld, this);
    }

    Provider.prototype.getUserDataOld = function() {
      var theData;
      theData = [
        {
          firstName: "Michael",
          lastName: 'Alexander',
          age: 20
        }, {
          firstName: 'John',
          lastName: 'Allen',
          age: 29
        }
      ];
      return this.providedUserData(theData);
    };

    Provider.prototype.providedUserData = function(userData) {};

    Provider.prototype.getUserData = function() {
      var _this = this;
      return $.ajax('http://localhost:3000/posts.json', {
        type: 'GET',
        datatype: "jsonp",
        jsonp: 'jsonp',
        crossDomain: 'true',
        success: function(res, status, xhr) {
          console.log('success');
          return _this.providedUserData(res);
        },
        error: function(xhr, status, err) {
          return console.log('error ajax err = ' + err);
        },
        complete: function(xhr, status) {
          return console.log('complete ajax');
        }
      });
    };

    return Provider;

  })();

  UseCase = (function() {
    function UseCase() {
      this.dataReceived = __bind(this.dataReceived, this);
      this.getData = __bind(this.getData, this);
      this.start = __bind(this.start, this);
    }

    UseCase.prototype.start = function() {
      return this.getData();
    };

    UseCase.prototype.getData = function() {};

    UseCase.prototype.dataReceived = function() {};

    return UseCase;

  })();

  Glue = (function() {
    function Glue(useCase, gui, provider) {
      var _this = this;
      this.useCase = useCase;
      this.gui = gui;
      this.provider = provider;
      After(this.useCase, "getData", function() {
        return _this.provider.getUserData();
      });
      After(this.provider, "providedUserData", function(userData) {
        return _this.gui.showMyElem(userData);
      });
      LogAll(this.useCase);
      LogAll(this.gui);
      LogAll(this.provider);
    }

    return Glue;

  })();

  App = (function() {
    function App() {
      var glue, gui, provider, useCase;
      console.log('hello, app.coffee');
      useCase = new UseCase();
      gui = new Gui();
      provider = new Provider();
      glue = new Glue(useCase, gui, provider);
      useCase.start();
    }

    return App;

  })();

  new App();

}).call(this);

/*
//@ sourceMappingURL=app.map
*/