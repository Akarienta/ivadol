(function () {
   'use strict';

   angular
      .module('app')
      .animation('.menu', function () {
         var HIDE_CLASS = 'ng-hide';
         return {
            removeClass: function (element, className, done) {
               if (className === HIDE_CLASS) {
                  element.slideDown(done);
               }
            },
            addClass: function (element, className, done) {
               if (className === HIDE_CLASS) {
                  element.slideUp(done);
               }
            }
         };
      });

})();