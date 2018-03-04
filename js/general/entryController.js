angular.module('entry', ['ui.router', 'ui.bootstrap', 'entryUser', 'entryActivity'])

.controller('entryController', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
  $scope.user = $stateParams.obj;
  $state.go('entry.user', {obj:$scope.user});
  $scope.radioModel = 'user';
  $scope.checkModel = {
    user: false,
    activity: false
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
