angular.module('rootModule', ['commandModule', 'servicesModule'])
.controller('rootController', ['$scope', 'timerService', function($scope, timerService) {
  'use strict';
  $scope.test = 'Testing';
  $scope.front = { master:timerService.getMaster(),
    remove: function(index) {
      timerService.removeFromMaster(index);
    },
    getTime: function(_begin) {
      if(angular.isDefined($scope.quickTime)) {
        timerService.validateUserInput($scope.quickTime, _begin);
      }
    }
  };
  function init() {
    timerService.pushToMaster(
      {
        quickTime:[5,0],
        alarm: new Audio('./audio/alarm.mp3'),
        queue: [{minutes:1, seconds:0}],
        begin: false
      });
    timerService.pushToMaster(
      {
        quickTime:[25,0],
        alarm: new Audio('./audio/alarm.mp3'),
        queue: [{minutes:5, seconds:0}],
        begin: false
      });
  }
  /* Initialize the timers */
  /* init(); */
}]);
