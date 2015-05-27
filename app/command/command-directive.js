angular.module('commandModule')
  .directive('commandLine', function() {
    return {
      restrict: 'EA',
      templateUrl: 'command/command-template.html',
      link: function(scope, elem, attrs) {
        // stuff goes here
        console.log('LINKED');
      }
    };
  }
);
