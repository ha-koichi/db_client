angular.module('entryAdminUserUpdate', [])

.controller('entryAdminUserUpdateController', ['$scope', '$http', function($scope, $http) {

  $scope.userList = '';
  $scope.isUpdateDisabled = true;
  $scope.isFileActive = false;
  $scope.isAdminFlg = false;

  $scope.search = function() {
    $scope.succesFlag = false;
    $scope.errorFlag = false;
    $scope.file = '';
    $scope.formList.name = '';
    $scope.formList.designation = '';
    $scope.formList.mobile = '';
    $scope.formList.$picture = '';
    $scope.formList.adminFlg = '';
    $scope.isFileActive = false;
    $scope.isAdminFlg = false;

    $http({
      method: 'POST',
      url: 'http://localhost/db_server/search_user.php',
      data: { address: $scope.formList.email,
              department: $scope.formList.department,
              password: $scope.formList.password
            },
    })
    .success(function(data, status, headers, configs){
      $scope.isUpdateDisabled = true;
      $scope.isFileActive = false;
      $scope.isAdminFlg = false;
      $scope.userList = data;
    })
    .error(function(data, status, headers, config) {
      $scope.errorFlag = true;
    })
  }

  // Selecting list method
  $scope.selectRadio = function($index){
    $scope.isUpdateDisabled = false;
    $scope.isFileActive = true;
    $scope.isAdminFlg = true;
    $scope.formList = angular.copy($scope.userList[$index]);
    if ($scope.formList.adminFlg === '1') {
      $scope.formList.adminFlg = true;
    }
  }

  $scope.$watch("file",function(file){

    $scope.srcUrl = undefined;

    if(!file || !file.type.match("image.*")){
        return;
    }

    //new FileReader API
    var reader = new FileReader();

    //callback
    reader.onload = function(){
        $scope.$apply(function(){
            $scope.srcUrl = reader.result;
        });
    };

    //read as url(reader.result = url)
    reader.readAsDataURL(file)
  });

  // Update uesr information
  $scope.update = function() {
    var fd = new FormData();
    fd.append('id',$scope.formList.id);
    fd.append('name',$scope.formList.name);
    fd.append('designation',$scope.formList.designation);
    fd.append('department',$scope.formList.department);
    fd.append('email',$scope.formList.email);
    fd.append('mobile',$scope.formList.mobile);
    fd.append('password',$scope.formList.password);
    if ($scope.file === '') {
      fd.append('file','');
    } else {
      fd.append('file',$scope.file);
    }
    fd.append('adminFlg',$scope.formList.adminFlg);

    $scope.succesFlag = false;
    $scope.errorFlag = false;

    $http.post('http://localhost/db_server/update_user.php',fd,{
        transformRequest: null,
        headers: {'Content-type':undefined}
    })
    .success(function(data, status, headers, configs){
      $scope.succesFlag = true;
      $scope.formList = '';
      $scope.file = '';
    })
    .error(function(data, status, headers, config) {
      $scope.errorFlag = true;
    });
  }
}])
.directive('fileModel',function($parse){
    return{
        restrict: 'A',
        link: function(scope,element,attrs){
            var model = $parse(attrs.fileModel);
            element.bind('change',function(){
                scope.$apply(function(){
                    model.assign(scope,element[0].files[0]);
                });
            });
        }
    };
});
