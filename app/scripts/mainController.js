(function () {
   'use strict';

   angular
      .module('app')
      .controller('MainController', MainController);

   /** @ngInject */
   function MainController(gettextCatalog, $rootScope) {
      var vm = this;

      vm.title = gettextCatalog.getString('Na něco se tě zeptám...');
      vm.changeLanguage = changeLanguage;

      ////////////

      function changeLanguage(lang) {
         return $rootScope.$emit('changeLanguage', lang);
      }
   }

})();
