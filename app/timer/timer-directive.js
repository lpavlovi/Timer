/* global angular */
'use strict';
angular.module('rootModule')
.directive('timer', ['timerService', function(timerService) {
  return {
    restrict: 'EA',
    templateUrl: 'timer/timer-template.html',
    replace: true,
    scope: {
      // an object array with two values - 0: seconds, 1: minutes
      config: '=',
      index:'='
    },
    link: function(scope) {
      // this is the only variable which will be interfacing with the front
      scope.front = {
        time: ''
      };
      var expectedTime;
      var benchmark;
      var delta;
      var actual;
      var resetValue;
      var isQueueDefined = false;
      var seconds = 3;
      var minutes = 0;
      var stopcheck = false;
      var isDone = false;
      scope.start = function() {
        // BENCHMARK: BEGIN
        if(!stopcheck && !isDone) {
          benchStart();
          stopcheck = true;
          window.setTimeout(recursiveTimeout, 1000);
        }
      };
      scope.stop = function() {
        stopcheck = false;
      };
      scope.reset = function() {
        // add reset behaviour here
        isDone = false;
        seconds = resetValue[1];
        minutes = resetValue[0];
        scope.front.time = formatTime(minutes, seconds);
      };
      scope.remove = function() {
        timerService.removeFromMaster(scope.index);
      };
      scope.$on('$destroy', function() {
       scope.stop();
      });
      function recursiveTimeout() {
        if(stopcheck) {expectedTime += 1000;
          ds();
          actual = window.performance.now() - benchmark;
          delta =  Math.round(actual) - expectedTime;
          window.setTimeout(recursiveTimeout, (1000 - delta));
        }
      }
      function ds() {
        seconds--;
        if(seconds <= 0) {
          if(minutes !== 0) {
            // Next Minute
            // -- update the minutes and seconds
            // -- update time
            minutes--;
            seconds = 59;
          }
          else {
            if(!isQueueDefined || isQueueEmpty()) {
              // DONE -- stop the recursive calls
              scope.stop();
              isDone = true;
            } else {
              // Goto next queued interval
              // -- update the minutes and seconds
              // -- slice queue array
              // -- update front.queue array
              // --:-- available through the formatTime function
              // -- run scope.$apply()
              deque();
            }
              if(angular.isDefined(scope.config.alarm)) {scope.config.alarm.play();}
          }
        }
        scope.front.time = formatTime(minutes, seconds);
        scope.$apply();
      }
      function deque() {
        scope.front.queue.splice(0, 1);
        var a = scope.config.queue.splice(0, 1)[0];
        minutes = a.minutes;
        seconds = a.seconds;
        updateReset(a.minutes, a.seconds);
      }
      function updateReset(m, s) {
        resetValue = [m,s];
      }
      function formatQueue() {
        scope.front.queue = [];
        if(isQueueDefined) {
          for(var i = 0; i < scope.config.queue.length; ++i) {
            scope.front.queue.push({interval: formatTime(scope.config.queue[i].minutes, (scope.config.queue[i].seconds))});
          }
        }
      }
      function formatTime(m, s) {
        return ( m < 10 ? '0' + m : m ) + ( s < 10 ? ':0' + s : ':' + s );
      }
      function init() {
        if(angular.isDefined(scope.config)) {
          isQueueDefined = angular.isDefined(scope.config.queue);
          if(angular.isDefined(scope.config.quickTime)) {
            minutes = scope.config.quickTime[0];
            seconds = scope.config.quickTime[1];
          }
          if(!!scope.config.begin) { scope.start(); }
        }
        else {
          minutes = 25;
          seconds = 0;
        }
        updateReset(minutes, seconds);
        scope.front.time = formatTime(minutes,seconds);
        formatQueue();
      }
      function benchStart() {
          benchmark = window.performance.now();
          expectedTime = 0;
      }
      function isQueueEmpty() {
        return !scope.config.queue[0];
      }
      init();
    }
  };
}]);

