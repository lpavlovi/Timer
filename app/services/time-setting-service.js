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
  });
