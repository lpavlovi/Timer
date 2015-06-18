'use strict';
angular.module('servicesModule')
  .factory('intervalFactory', function() {
    return function Interval(quick, queue, begin) {
      this.quickTime = quick;
      this.begin = begin;
      this.queue = [];
      if(!!queue) {
        for (var i = 0; i < queue.length; ++i) {
          this.queue.push({minutes:queue[i][0], seconds:queue[i][1]});
        }
      }
      this.alarm = new Audio('../audio/alarm.mp3');
    }
  });
