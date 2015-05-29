'use strict';
angular.module('servicesModule')
.directive('keypressBinding', ['keyManager', function(keyManager) {
  return {
    restrict: 'EA',
    scope: true,
    link: function(scope) {
      jQuery(document).on('keyup', function(e){
        scope.a(e);
      });
    }
  };
}]);

