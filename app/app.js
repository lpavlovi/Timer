angular.module('rootModule', ['commandModule', 'servicesModule'])
.controller('rootController', ['$scope', 'keyManager', 'timerService', function($scope, keyManager, timerService) {
  'use strict';
  var STANDARD_STATE = false;
  var cli = true;
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

  $scope.commandModel = '';
  $scope.a = function(e) {
    if(keyManager.onEvent(e, $scope.commandModel)) {
      intoStandard();
    }
    else if(cli === false){
      intoInput();
    }
  };
  function intoStandard() {
    cli = false;
    fadeOut();
    $scope.$apply();
  }
  function intoInput() {
    cli = true;
    fadeIn();
    $scope.commandModel = '';
    $scope.$apply();
    keyManager.getInputElement().focus();
  }
  function fadeOut() {
    $("command-line").fadeOut(150);
    $(".input_state_opacity").css({opacity:1.0});
  }
  function fadeIn() {
    $("command-line").fadeIn(150);
    $(".input_state_opacity").css({opacity:0.3});
  }
}]);
