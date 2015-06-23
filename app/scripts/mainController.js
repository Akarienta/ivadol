(function () {
   'use strict';

   angular
      .module('app')
      .controller('MainController', MainController);

   /** @ngInject */
   function MainController(gettextCatalog, $rootScope, $location, $timeout, $scope) {
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
      vm.references = getReferences();
      vm.activeReference = 0;
      vm.referenceChange = true;
      vm.changeReference = changeReference;
      vm.resetForm = resetForm;
      vm.submitForm = submitForm;
      vm.name = '';
      vm.email = '';
      vm.phone = '';
      vm.subject = '';
      vm.msg = '';
      vm.scrollTo = scrollTo;

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
         if (Modernizr.touch) {
            return gettextCatalog.getString('Klikněte pro detail.');
         } else {
            return gettextCatalog.getString('Najeďte myší pro detail.');
         }
      }

      function getReferences() {
         var refs = [];
         refs.push({
            text: gettextCatalog.getString('V oblasti tvorby internetových stránek jsem úplný laik, a tak jsem musela sehnat profesionála v tomto oboru. Měla jsem velké štěstí v podobě Ivy Doležalové, která je podle mne v oboru jednička. Stránky vytvořila dle mé potřeby a spokojenosti. Její rady a poznatky byly vždy věcné a velmi užitečné. Pokud hledáte profesionalitu, kvalitu a osobní přístup, služby Ivy Doležalové mohu jen doporučit.'),
            author: gettextCatalog.getString('Pavla, zadavatelka webu Koliba Opava')
         });
         refs.push({
            text: gettextCatalog.getString('Spolupráce s Ivanou byla příjemná a bezproblémová. Její práce byla vysoce profesionální, ve všem nám vyšla vstříc. Rozhodně doporučuji.'),
            author: gettextCatalog.getString('Katka, zadavatelka webu Všem ženám')
         });
         // TODO - doplnit recenze - Lenka, Terka
         return refs;
      }

      function changeReference(next) {
         var nextRef;
         if (next) {
            nextRef = (vm.activeReference === vm.references.length - 1) ? 0 : vm.activeReference + 1;
         } else {
            nextRef = (vm.activeReference === 0) ? vm.references.length - 1 : vm.activeReference - 1;
         }
         $timeout(function () {
            vm.referenceChange = true;
            vm.activeReference = nextRef;
         }, 500);
         vm.referenceChange = false;
      }

      function resetForm() {
         vm.name = '';
         vm.email = '';
         vm.phone = '';
         vm.subject = '';
         vm.msg = '';
         $scope.contactForm.$setPristine();
      }

      function submitForm() {
         $scope.contactForm.name.$setDirty();
         $scope.contactForm.email.$setDirty();
         $scope.contactForm.msg.$setDirty();

         if ($scope.contactForm.$invalid) {
            return;
         } else {
            alert('Odeslano!\n\n' +
               'Jmeno: ' + vm.name +
               '\nE-mail: ' + vm.email +
               '\nTelefon: ' + vm.phone +
               '\nPredmet: ' + vm.subject +
               '\nZprava: ' + vm.msg + '');
         }

         resetForm();
      }

   }

})();
