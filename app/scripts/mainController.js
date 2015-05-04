(function () {
   'use strict';

   angular
      .module('app')
      .controller('MainController', MainController);

   /** @ngInject */
   function MainController(gettextCatalog, $rootScope, $location) {
      var vm = this;

      vm.isMobileMenuVisible = false;

      vm.changeLanguage = changeLanguage;
      vm.showHideMobileMenu = showHideMobileMenu;
      vm.webTitle = '';
      vm.webName = '';

      resolveNames();

      ////////////

      function changeLanguage(lang) {
         return $rootScope.$emit('changeLanguage', lang);
      }

      function showHideMobileMenu() {
         vm.isMobileMenuVisible = !vm.isMobileMenuVisible;
      }

      function resolveNames() {
         var domain = $location.host().split('.').reverse()[1];
         if (domain === 'ivadol') {
            /// webpage title
            vm.webTitle = gettextCatalog.getString('Freelancer Ivana - vizitka');
            /// webpage name (next to the logo)
            vm.webName = gettextCatalog.getString('FL Ivana');
         } else {
            /// webpage title
            vm.webTitle = gettextCatalog.getString('CHCI WEB - profesionální web rychle a levně');
            /// webpage name (next to the logo)
            vm.webName = gettextCatalog.getString('Chci web');
         }
      }
   }

})();
