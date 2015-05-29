/* States: STANDARD || INPUT
*
* STANDARD:  standardState = true;
* whole document
* ---> INPUT:    keypress: 'i'
*
* INPUT:     standardState = false;
* only the input box
* ---> STANDARD: keypress: 'ESC'
* ---> STANDARD: click off the textbox
*
* */
'use strict';
angular.module('servicesModule')
.service('keyManager', ['timerService', function(timerService) {
  this.standardState = false;
  var inputElement;
  this.standardToInput = function() {
    this.standardState = false;
  };
  this.setInputElement = function(x) {
    inputElement = x;
  };
  this.getInputElement = function() {
    return inputElement;
  };
  this.onEvent = function(e,input) {
    // Standard State
    if(this.standardState === true) {
      // press 'i' key to get to input mode
      if(e.which === 73) {
        this.standardState = false;
      }
    }
    // Input State
    else {
      // if escape key is pressed
      if(e.which === 27) {
        this.standardState = true;
      }
      // if enter key is pressed
      else if(e.which === 13) {
        this.standardState = true;
        // process input
        timerService.validateUserInput(input, e.shiftKey);
      }
    }
    /*console.log('Keypress: ' + e.which);*/
    return this.standardState;
  };
}]);
