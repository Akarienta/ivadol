(function () {
   'use strict';

   angular
      .module('app')
      .controller('MainController', MainController);

   /** @ngInject */
   function MainController(gettextCatalog, $rootScope) {
      var vm = this;

      vm.isMobileMenuVisible = false;

      vm.changeLanguage = changeLanguage;
      vm.showHideMobileMenu = showHideMobileMenu;

      ////////////

      function changeLanguage(lang) {
         return $rootScope.$emit('changeLanguage', lang);
      }

      function showHideMobileMenu() {
         vm.isMobileMenuVisible = !vm.isMobileMenuVisible;
      }
   }

})();
