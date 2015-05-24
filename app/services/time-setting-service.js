'use strict';
angular.module('rootModule')
  .service('timerService', function() {
    var masterArray = [];
    this.pushToMaster = function(settings) {
      masterArray.push(settings);
    };
    this.getMaster = function() {
      return masterArray;
    };
    this.removeFromMaster = function(index) {
      masterArray.splice(index,1);
    };
    this.validateUserInput = function(userInput) {
      var time;
      if(userInput !== '' &&
          (time = userInput.split(':')).length === 2 && !isNaN(time[0]) && !isNaN(time[1])) {
        this.pushToMaster({
          quickTime:[parseInt(time[0]),parseInt(time[1])],
          alarm: new Audio('../audio/alarm.mp3')
        });
      }
    };
  });
