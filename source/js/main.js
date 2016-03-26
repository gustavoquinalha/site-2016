var fis = {};

fis.functions = (function() {

  'use strict';

  var trigger = document.querySelector('.area');

  function init() {
    toggleClass();
  }

  function toggleClass() {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      this.classList.toggle('active');
    });
  }

  return {
    init: init
  };

}());

window.onload = function (){
  fis.functions.init();
};
