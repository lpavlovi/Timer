'use strict';
angular.module('rootModule')
.directive('keypressBinding', ['keyManager', function(keyManager) {
  return {
    restrict: 'EA',
    link: function postLink(scope, iElement, iAttrs){
      jQuery(document).on('keypress', function(e){
        // scope.$apply(scope.keyPressed(e));
        keyManager.onEvent(e);
      });
    }
  };
}]);

