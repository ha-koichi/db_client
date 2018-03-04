angular.module('entryAdminActivity', ['ui.router', 'ui.dateTimeInput', 'ui.bootstrap.datetimepicker'])

.controller('entryAdminActivityController', ['$scope', '$http','$stateParams', '$filter', function($scope, $http, $stateParams, $filter) {
  $scope.activityTitle = "";
  $scope.activityDescription = "";
  $scope.fromDataTime = "";
  $scope.toDataTime = "";
  $scope.location = "";
  $scope.grace_as = "";
  $scope.remarks = "";


  $scope.entry = function() {
    $scope.succesFlag = false;
    $scope.errorFlag = false;
    // Change format and located time to BD time(+0600)
    $scope.fromDataTime = $filter('date')($scope.fromDataTime, 'yyyy-MM-dd HH:mm:ss', '+0600');
    $scope.toDataTime = $filter('date')($scope.toDataTime, 'yyyy-MM-dd HH:mm:ss', '+0600');

    $http({
      method: 'POST',
      url: 'http://localhost/db_server/entry_active.php',
      data: { id : $stateParams.obj[0].id,
              title : $scope.activityTitle,
              description : $scope.activityDescription,
              fromDataTime : $scope.fromDataTime,
              toDataTime : $scope.toDataTime,
              location : $scope.location,
              grace_as : $scope.grace_as,
              remarks : $scope.remarks
            },
    })
    .success(function(data, status, headers, config) {
      $scope.activityTitle = '';
      $scope.activityDescription = '';
      $scope.fromDataTime = '';
      $scope.toDataTime = '';
      $scope.location = '';
      $scope.password = '';
      $scope.grace_as = '';
      $scope.remarks = '';
      $scope.succesFlag = true;
    })
    .error(function(data, status, headers, config) {
      $scope.errorFlag = true;
    })
  }
}]);
