'use strict';
angular.module('commandModule')
.directive('commandLine', ['keyManager', function(keyManager) {
  return {
    restrict: 'EA',
    scope: false,
    templateUrl: 'command/command-template.html',
    link: function postLink(scope, elem, attrs) {
      var inputElement = elem.contents().find("input")[0];
      inputElement.focus();
      keyManager.setInputElement(inputElement);
    }
  };
}]);
