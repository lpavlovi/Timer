/* code from StackOverflow: http://stackoverflow.com/questions/17470790/how-to-use-a-keypress-event-in-angularjs */
/* global angular */
'use strict';
angular.module('rootModule')
.directive('ngEnter', function() {
  return {
    scope: {
      callback: '=',
      shift_callback: '='
    },
    link: function(scope, elem, attrs) {
      var bb = document.getElementById("theoneandonly");
      bb.focus();
      elem.bind("keydown keypress", function (event) {
        if(event.which === 13) {
          scope.callback(event.shiftKey);
          event.preventDefault();
          scope.$apply();
        }
      });
    }
  };
  });
