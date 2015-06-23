(function () {
   'use strict';

   angular
      .module('app', [
         'ngRoute',
         'ngAnimate',
         'gettext',
         'angular-svg-round-progress',
         'angular-inview'
      ])

      /** @ngInject */
      .config(function ($routeProvider) {
         $routeProvider.otherwise({
            templateUrl: 'index.html'
         });
      })

      /** @ngInject */
      .run(function (gettextCatalog, $rootScope, $location) {
         if ($location.host().split('.').reverse()[0] === 'com') {
            gettextCatalog.setCurrentLanguage('en_US');
         } else {
            gettextCatalog.setCurrentLanguage('cs_CZ');
         }

         $rootScope.$on('changeLanguage', function (event, lang) {
            gettextCatalog.setCurrentLanguage(lang);
         });
      })

      /** @ngInject */
      .constant('roundProgressConfig', {
         max: 100,
         semi: false,
         rounded: false,
         clockwise: true,
         radius: 65,
         color: "#563E31",
         bgcolor: "#E6EEF2",
         stroke: 8,
         iterations: 100,
         animation: "easeOutCubic"
      });
})();
