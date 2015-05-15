angular.module('rootModule', [])
.controller('rootController', ['$scope', 'timerService', function($scope, timerService) {
  $scope.test = 'Testing';
  $scope.front = { master:timerService.getMaster(),
    remove: function(index) {
      timerService.removeFromMaster(index);
    },
    add: function(x) {
      timerService.pushToMaster({quicktime:[1,45]});
    },
    getTime: function() {
      var time;
      if(angular.isDefined($scope.quickTime) && $scope.quickTime !== '' && (time = $scope.quickTime.split(':')).length === 2 && !isNaN(time[0]) && !isNaN(time[1])) {
        timerService.pushToMaster({quickTime:[parseInt(time[0]),parseInt(time[1])]});
      }
    }
  };
  function init() {
    timerService.pushToMaster({quickTime:[25,0],queue:[ [5,0] ]});
  }
  init();
}]);
