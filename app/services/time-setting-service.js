'use strict';
angular.module('rootModule')
  .service('timerService', function() {
    var masterArray = [];
    var timingSets = [
      {name:'POM', setup:{quickTime:[25,0], alarm: new Audio('../audio/alarm.mp3'), queue:[{minutes:5, seconds:0}]}},
      {name:'SPR', setup:{quickTime:[7,30], alarm: new Audio('../audio/alarm.mp3'), queue:[{minutes:7, seconds:30}, {minutes:7, seconds:30}, {minutes:7, seconds:30}]}}
      
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
          this.pushToMaster({
            quickTime:[parseInt(time[0]),parseInt(time[1])],
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
          var a = timingSets[i].setup;
          a.begin = _begin;
          this.pushToMaster(a);
          return;
        }
      }
    };
    function validNumber(n) {
      return !isNaN(n) && n !== '';
    }
  });
