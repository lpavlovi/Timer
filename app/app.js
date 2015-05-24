angular.module('rootModule', [])
.controller('rootController', ['$scope', 'timerService', function($scope, timerService) {
  'use strict';
  $scope.test = 'Testing';
  $scope.front = { master:timerService.getMaster(),
    remove: function(index) {
      timerService.removeFromMaster(index);
    },
    getTime: function() {
      var time;
      if(angular.isDefined($scope.quickTime)) {
        timerService.validateUserInput($scope.quickTime);
      }
    }
  };
  function init() {
    timerService.pushToMaster(
      { 
        quickTime:[0,3],
        alarm: new Audio('./audio/alarm.mp3'),
        queue:[{minutes:0, seconds:2}, {minutes:0, seconds:2}]
      });
  }
  init();
}]);
