'use strict';
angular.module('commandModule')
.directive('commandLine', ['keyManager', function(keyManager) {
  return {
    restrict: 'EA',
    scope: false,
    templateUrl: 'command/command-template.html',
    link: function postLink(scope, elem, attrs) {
      keyManager.setInputElement(elem.contents().find("input")[0]);
    }
  };
}]);
