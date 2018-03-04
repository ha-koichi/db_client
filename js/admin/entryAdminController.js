angular.module('entryAdmin', ['ui.router', 'ui.bootstrap', 'entryAdminUser', 'entryAdminActivity', 'entryAdminUserUpdate', 'entryAdminActivityUpdate'])

.controller('entryAdminController', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
  $scope.user = $stateParams.obj;
  $state.go('entryAdmin.user');
  $scope.radioModel = 'userInput';
  $scope.checkModel = {
    userInput: false,
    userUpdate: false,
    activityInput: false,
    activityUpdate: false
  };

  $scope.$watchCollection('checkModel', function () {
    $scope.checkResults = [];
    angular.forEach($scope.checkModel, function (value, key) {
      if (value) {
        $scope.checkResults.push(key);
      }
    });
  });
}]);
