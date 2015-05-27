'use strict';
angular.module('servicesModule')
  .service('keyManager', function() {
    var keyValuePair = [];
    this.add = function(x) {
      keyValuePair.push(x);
    };
    this.remove = function(i) {
      keyValuePair.splice(i,1);
    };
    this.onEvent = function(e) {
      console.log(e);
    };
});
