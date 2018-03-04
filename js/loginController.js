angular.module('login', ['ui.router', 'entry', 'entryAdmin', 'values'])

.config(['$stateProvider', '$urlRouterProvider',
  function( stateProvider, urlRouterProvider ){
    stateProvider
      .state('/', {
        url: "/login",
        templateUrl: 'views/login.html'
      })
      .state('entry', {
        url: "/entry",
        templateUrl: 'views/general/entry.html',
        params: {
          obj: null
        }
      })
      .state('entry.user', {
        url: "/user",
        templateUrl: 'views/general/entry_user.html',
        params: {
          obj: null
        }
      })
      .state('entry.activity', {
        url: "/activity:params",
        templateUrl: 'views/general/entry_activity.html',
        params: {
          obj: null
        }
      })
      .state('entryAdmin', {
        url: "/entryAdmin",
        templateUrl: 'views/admin/entry.html',
        params: {
          obj: null
        }
      })
      .state('entryAdmin.user', {
        url: "/user",
        templateUrl: 'views/admin/entry_user.html',
      })
      .state('entryAdmin.userUpdate', {
        url: "/userUpdate",
        templateUrl: 'views/admin/entry_user_update.html',
      })
      .state('entryAdmin.activityUpdate', {
        url: "/activityUpdate:params",
        templateUrl: 'views/admin/entry_activity_update.html',
        params: {
          obj: null
        }
      })
      .state('entryAdmin.activity', {
        url: "/activity:params",
        templateUrl: 'views/admin/entry_activity.html',
        params: {
          obj: null
        }
      });
      urlRouterProvider.otherwise('/login');
    }
])

.controller('loginController', ['$scope', '$http', '$state', '$stateParams', 'url', function($scope, $http, $state, $stateParams, url) {
console.log(url);
  this.postForm = function() {

    $http({
      method: 'POST',
      url: url.login,
      data: { address: this.inputData.address,
              password: this.inputData.password
            },
    })
    .success(function(data, status, headers, config) {
      if ( data !== null ) {
        if (data[0].adminFlg === '1'){
          $state.go('entryAdmin', {obj:data});
        } else {
          $state.go('entry', {obj:data});
        }
      } else {
        $scope.errorMsg = "Login not correct";
      }
    })
    .error(function(data, status, headers, config) {
      $scope.errorMsg = 'Failure to connect server';
    })
  }
}]);
