(function () {
   'use strict';

   angular
      .module('app', [
         'ngRoute',
         'gettext'
      ])

      /** @ngInject */
      .config(function ($routeProvider) {
         $routeProvider.otherwise({
            templateUrl: 'index.html'

         });
      })

      /** @ngInject */
      .run(function (gettextCatalog, $rootScope) {
         gettextCatalog.setCurrentLanguage('en_US');
         $rootScope.$on('changeLanguage', function (event, lang) {
            gettextCatalog.setCurrentLanguage(lang);
         });
      });

})();
