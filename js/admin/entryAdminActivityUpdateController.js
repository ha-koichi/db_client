angular.module('entryAdminActivityUpdate', ['ui.router', 'ui.dateTimeInput', 'ui.bootstrap.datetimepicker'])

.controller('entryAdminActivityUpdateController', ['$scope', '$http','$stateParams', '$filter', function($scope, $http, $stateParams, $filter) {

  $scope.activeList = '';
  $scope.formList = '';
  $scope.isUpdateDisabled = true;

  $scope.search = function() {
    $scope.succesFlag = false;
    $scope.errorFlag = false;
    $scope.formList.location = '';
    $scope.formList.grace_as = '';
    $scope.formList.remarks = '';

    var fromDataTime = $filter('date')($scope.formList.fromDataTime, 'yyyy-MM-dd HH:mm:ss', '+0600');
    var toDataTime = $filter('date')($scope.formList.toDataTime, 'yyyy-MM-dd HH:mm:ss', '+0600');

    $http({
      method: 'POST',
      url: 'http://localhost/db_server/search_active.php',
      data: { title: $scope.formList.activityTitle,
              description: $scope.formList.activityDescription,
              fromDataTime: fromDataTime,
              toDataTime : toDataTime,
            },
    })
    .success(function(data, status, headers, configs){
      $scope.activeList = data;
      $scope.isUpdateDisabled = true;
    })
    .error(function(data, status, headers, config) {
      $scope.errorFlag = true;
    })
  }

  // Selecting list method
  $scope.selectRadio = function($index){
    $scope.isUpdateDisabled = false;
    $scope.formList = angular.copy($scope.activeList[$index]);
  }

  // Update active information
  $scope.update = function() {
    var fd = new FormData();
    fd.append('id',$scope.formList.a_id);
    fd.append('title',$scope.formList.activityTitle);
    fd.append('description',$scope.formList.activityDescription);
    fd.append('fromDataTime',$scope.formList.fromDataTime);
    fd.append('toDataTime',$scope.formList.toDataTime);
    fd.append('location',$scope.formList.location);
    fd.append('grace_as',$scope.formList.grace_as);
    fd.append('remarks',$scope.formList.remarks);

    $scope.succesFlag = false;
    $scope.errorFlag = false;

    $http.post('http://localhost/db_server/update_active.php',fd,{
        transformRequest: null,
        headers: {'Content-type':undefined}
    })
    .success(function(data, status, headers, configs){
      $scope.formList = '';
      $scope.succesFlag = true;
    })
    .error(function(data, status, headers, config) {
      $scope.errorFlag = true;
    });
  }

}]);
