// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.activity', {
        url: '/activity',
        views: {
            'menuContent': {
                templateUrl: 'templates/activity.html',
                controller: 'ActivityCtrl'
            },
            'fabContent': {
                template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })

    .state('app.friends', {
        url: '/friends',
        views: {
            'menuContent': {
                templateUrl: 'templates/friends.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-friends').classList.toggle('on');
                    }, 900);
                }
            }
        }
    })

    .state('app.gallery', {
        url: '/gallery',
        views: {
            'menuContent': {
                templateUrl: 'templates/gallery.html',
                controller: 'GalleryCtrl'
            },
            'fabContent': {
                template: '<button id="fab-gallery" class="button button-fab button-fab-top-right expanded button-energized-900 drop"><i class="icon ion-heart"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-gallery').classList.toggle('on');
                    }, 600);
                }
            }
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});

Parse.initialize("HPO14qrXOVv8i6NKQq5UJeGx07IUMDGY0fRhtK4z", "P1JI9V8KsBN88X0uwAfGh5FVngz4VU7Gc3GTWtrX");

var TestObject = Parse.Object.extend("TestObject");
var testObject = new TestObject();
  testObject.save({foo: "bar2"}, {
  success: function(object) {
    $(".success").show();
  },
  error: function(model, error) {
    $(".error").show();
  }
});

Parse.User.enableRevocableSession()
var Post = Parse.Object.extend("Post");
function checkLogin() {
  if (Parse.User.current()){
    console.log("Logged in! "+Parse.User.current().get("username"));
    $("#current-user").html("User: "+Parse.User.current().get("username"));
  } else {
      $("#current-user").html("");
  }
}

checkLogin();

$("#logout").click(function(event) {
  Parse.User.logOut();
  console.log("You are now logged out!");
  checkLogin();
});

$("#login").submit(function(event){
  event.preventDefault();
  // this prevents people from refreshing the browser
  var name = $("#login-name").val();
  var pass = $("#login-password").val();
  //so next we have to send parse the uname and pass
  Parse.User.logIn(name, pass, {
    success: function(user){
      //success passes the user object back with a message
      console.log("You are now logged in!");
      checkLogin();
    }, error: function(user, error){
      console.log("Log in failed!"+error.message);
    }
  });
});

$("#signup").submit(function(event){
  event.preventDefault();

    var name = $("#signup-name").val();
    var pass = $("#signup-password").val();

    var user = new Parse.User();
    user.set("username", name);
    user.set("password", pass);

    user.signUp(null, {
      success: function(user){
        checkLogin();
      }, error: function(user, error){
        console.log("signup error:"+error.message);
      }
    });
  });

function getPosts() {
  var query = new Parse.Query(Post);
  query.find({
    success: function(results){
      var output ="";
      for (var i in results){
          var title = results[i].get("title");
          var content = results[i].get("content");
          output += "<li>";
          output += "<h3>"+title+"</h3>";
          output += "<p>"+content+"</p>";
          output += "</li>";
          //console.log("Title:"+title)
      }
      $("#list-posts").html(output);
    }, error: function(error){
      console.log("Query Error:"+error.message);
    }
  });
}

getPosts();

$("#post-form").submit(function(event){
  event.preventDefault();
    var title = $("#post-title").val();
    var content = $("#post-content").val();

    var newPost = new Post();
    newPost.set("title", title);
    newPost.set("content", content);

    newPost.save({
      success: function(){

      }, error: function(error){
          console.log("Error:" +error.message);
      }
    });
  });

  $("#logout").click(function(event) {
    Parse.User.logOut();
    console.log("You are now logged out!");
    checkLogin();
  });
