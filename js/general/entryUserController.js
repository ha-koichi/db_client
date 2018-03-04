angular.module('entryUser', [])

.controller('entryUserController', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {

  $scope.department = $stateParams.obj[0].department;

  $scope.entry = function() {

    var fd = new FormData();
    fd.append('name',$scope.name);
    fd.append('designation',$scope.designation);
    fd.append('department',$scope.department);
    fd.append('email',$scope.email);
    fd.append('mobile',$scope.mobile);
    fd.append('password',$scope.password);
    fd.append('file',$scope.file);
    fd.append('adminFlg',false);

    $scope.succesFlag = false;
    $scope.errorFlag = false;

    $http.post('http://localhost/db_server/entry_user.php',fd,{
        transformRequest: null,
        headers: {'Content-type':undefined}
    })
    .success(function(data, status, headers, configs){
      $scope.name = '';
      $scope.designation = '';
      $scope.department = '';
      $scope.email = '';
      $scope.mobile = '';
      $scope.password = '';
      $scope.file = '';
      $scope.adminFlg = '';
      $scope.succesFlag = true;
    })
    .error(function(data, status, headers, config) {
      $scope.errorFlag = true;
    });
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
