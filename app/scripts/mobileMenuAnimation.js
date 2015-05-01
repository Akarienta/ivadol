(function () {
   'use strict';

   angular
      .module('app')
      .animation('.mobile-menu', function () {
         var SHOW_CLASS = 'is-visible';
         return {
            removeClass: function (element, className, done) {
               console.log('volam nahoru');
               if (className === SHOW_CLASS) {
                  element.slideUp(done);
               }
            },
            addClass: function (element, className, done) {
               console.log('volam dolu');
               if (className === SHOW_CLASS) {
                  element.hide().slideDown(done);
               }
            }
         };
      });

})();