'use strict';
angular.module('servicesModule')
  .service('timerService', ['intervalFactory', function(interval) {
    var masterArray = [];
    var timingSets = [
        {name:'POM', quick:[25,0], queue:[[5,0]]},
        {name:'SPR', quick:[7,30], queue:[[7,30], [5,0]]},
        {name:'A', quick:[0,2], queue:[[0,2]]},
        {name:'B', quick:[0,5], queue:[[0,5]]},
      ];
    this.pushToMaster = function(settings) {
      masterArray.push(settings);
    };
    this.getMaster = function() {
      return masterArray;
    };
    this.removeFromMaster = function(index) {
      masterArray.splice(index,1);
    };
    this.validateUserInput = function(userInput, _begin) {
      var time;
      if(userInput !== '') {
        // If the user inputs a time interval with minutes and seconds separated by ':'
        if((time = userInput.split(':')).length === 2 && validNumber(time[0]) && validNumber(time[1])) {
          this.pushToMaster( new interval([parseInt(time[0]),parseInt(time[1])], null, _begin));
        }
        // no ':' delimeter
        else if(userInput.length === 4 && validNumber(userInput.substring(0,2)) && validNumber(userInput.substring(2,4))) {
          this.pushToMaster({
            quickTime:[parseInt(userInput.substring(0,2)),parseInt(userInput.substring(2,4))],
            alarm: new Audio('../audio/alarm.mp3'),
            begin: _begin
          });
        }
        // User inputs a preset phrase
        else {
          // search for a predefined set
          this.searchForPhrase(userInput, _begin);
        }
      }
    };
    this.searchForPhrase = function(x, _begin) {
      for(var i = 0; i < timingSets.length; ++i) {
        if(x === timingSets[i].name) {
          this.pushToMaster(new interval(timingSets[i].quick, timingSets[i].queue, _begin));
          return;
        }
      }
    };
    function validNumber(n) {
      return !isNaN(n) && n !== '';
    }
  }]);
