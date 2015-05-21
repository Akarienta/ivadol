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
      vm.isCzechLang = true;
      vm.showHideMobileMenu = showHideMobileMenu;
      vm.webTitle = '';
      vm.webName = '';
      vm.isProgressVisible = [false, false, false, false, false, false];
      vm.startProgress = startProgress;
      vm.getPortfolioText = getPortfolioText;

      resolveNames();

      ////////////

      function changeLanguage(lang) {
         vm.isCzechLang = lang === 'cs_CZ';
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

      function startProgress(index) {
         if (!vm.isProgressVisible[index]) {
            vm.isProgressVisible[index] = true;
         }
      }

      function getPortfolioText() {
         if (Modernizr.touch){
            return gettextCatalog.getString('Klikněte pro detail.');
         } else {
            return gettextCatalog.getString('Najeďte myší pro detail.');
         }
      }
   }

})();
