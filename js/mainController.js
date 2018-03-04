var app = angular.module('main', ['ui.bootstrap', 'values']);
  app.controller('mainController', ['$scope', '$http', '$timeout', '$filter', 'url', function($scope, $http, $timeout, $filter, url) {

    console.log(url);
    // Profile Information
    $scope.user = '';
    // Activity in detail Information
    $scope.detailList = "";
    // Timer counter
    $scope.counter = 0;
    // Inital Date and Time(Today and Now)
    $scope.setTime = moment().format("YYYY-MM-DD HH:mm:ss");

    var departments = [ "AMC",
                        "CBHC",
                        "CDC",
                        "ESD",
                        "HEP",
                        "HIS_eHealth",
                        "HRM",
                        "IFM",
                        "IHSM",
                        "TRD",
                        "MNCAH",
                        "NASP",
                        "NCDC",
                        "NEC",
                        "NNS",
                        "PLSM",
                        "PMR",
                        "PST",
                        "TLC"
                      ];

    // getting activity Information by user id
    $scope.getUserInfo = function(){
      $http({
        method: 'POST',
        url: url.user_info,
        data: { department: departments[$scope.counter],
                current: $scope.setTime
              }
      })
      .success(function(data, status, headers, config){
        $scope.userData = data[0];
        $scope.activities = data[0].activities;
      })
      .error(function(data, status, headers, config){
      });
    }
    $scope.getUserInfo();

    $scope.radioModel = departments[0];
    $scope.checkModel = {
      AMC: false,
      CBHC: false,
      CDC: false,
      ESD: false,
      HEP: false,
      HIS_eHealth: false,
      HRM: false,
      IFM: false,
      IHSM: false,
      TRD: false,
      MNCAH: false,
      NASP: false,
      NCDC: false,
      NEC: false,
      NNS: false,
      PLSM: false,
      PMR: false,
      PST: false,
      TLC: false
    };
    $scope.checkResults = [];

    $scope.$watchCollection('checkModel', function () {
      $scope.checkResults = [];
      angular.forEach($scope.checkModel, function (value, key) {
        if (value) {
          $scope.checkResults.push(key);
        }
      });
    });

    // returning method
    $scope.updateValue = function(){
      stop = $timeout(function(){
        $scope.counter++;
        if ($scope.counter === 19) {
          $scope.counter = 0;
        }
        $scope.radioModel = departments[$scope.counter];
        $scope.getUserInfo();
        $scope.updateValue();
      },5000);
    }
    $scope.updateValue();

    // click panel and getting user and activity information
    $scope.clickPanel = function(value){
      $scope.detailList = "";
      // for clear counter
      $timeout.cancel(stop);
      $scope.updateValue();
      $scope.counter = value;
      $scope.detailList = "";
      $scope.getUserInfo();
    }

    // stop automatical method
    $scope.touchActivity = function(){
      $timeout.cancel(stop);
    }

    // showing detail information
    $scope.showDetail = function($index){
      $scope.detailList = $scope.activities[$index];
    }

    // changing date is selected activity information
    $scope.changeTime = function(){
      $scope.setTime = moment($scope.setTime, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
      $scope.getUserInfo();
    };

  }]);
