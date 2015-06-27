(function () {
   'use strict';

   angular
      .module('app')
      .constant('SMALL_BREAK_POINT', 640)
      .controller('MainController', MainController);

   /** @ngInject */
   function MainController(gettextCatalog, $rootScope, $location, $timeout, $scope, $window, SMALL_BREAK_POINT, $document, $http, $sce) {
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
      vm.check = '';
      vm.orderWeb = orderWeb;
      vm.orderFreelancer = orderFreelancer;
      vm.sendMail = sendMail;
      vm.sendInProgress = false;
      vm.sentMsg = '';
      vm.showSentMsg = showSentMsg;
      vm.isLoaded = false;
      vm.captchaFirst = 0;
      vm.captchaSecond = 0;

      vm.invalidCheck = false;

      vm.unsupportedBrowser = gettextCatalog.getString('Nepodporovaný prohlížeč :-(');
      vm.unsupportedBrowserText = $sce.trustAsHtml(gettextCatalog.getString('Používaním zastaralého prohlížeče vystavujete svůj počítač nebezpečí. <a href="http://browsehappy.com">Browse Happy</a> je jedním ze způsobů, jak získat nejnovšjší verzi některého z nejpoužívanějších moderních prohlížečů. Také tam můžete nalézt informace o prohlížeči, který by nejspíše vyhovoval Vaším potřebám lépe, než prohlížeč, který používáte nyní.'));

      resolveNames();
      reloadCaptcha();

      ////////////

      function changeLanguage(lang) {
         vm.isCzechLang = lang === 'cs_CZ';
         return $rootScope.$emit('changeLanguage', lang);
      }

      function showHideMobileMenu() {
         if (angular.element($window).width() > SMALL_BREAK_POINT) {
            return;
         }
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
         clearForm();
         vm.sentMsg = '';
      }

      function submitForm() {
         vm.invalidCheck = false;
         vm.sentMsg = '';

         $scope.contactForm.name.$setDirty();
         $scope.contactForm.email.$setDirty();
         $scope.contactForm.msg.$setDirty();
         $scope.contactForm.check.$setDirty();

         if ($scope.contactForm.check.$valid && parseInt(vm.check) !== (vm.captchaFirst + vm.captchaSecond)) {
            vm.invalidCheck = true;
            return;
         }

         if ($scope.contactForm.name.$valid && $scope.contactForm.email.$valid && $scope.contactForm.msg.$valid) {
            sendMail();
         }
      }

      function sendMail() {
         vm.sendInProgress = true;

         var data = {
            'name': vm.name,
            'email': vm.email,
            'phone': vm.phone,
            'subject': vm.subject.trim() === '' ? 'Contact Form' : vm.subject,
            'msg': vm.msg.replace(/(\n)+/g, '<br />')
         };

         console.log('trim: ' + vm.subject.trim() === '');
         console.log(data.subject);

         $http.post('akarienta_www/ex2_contact/contact-form.php', data)
            .success(function () {
               vm.sentMsg = gettextCatalog.getString('Vzkaz byl úspěšně odeslán, děkuji. Budu Vás kontaktovat co nejdřívě.');
               afterSend();
            })
            .error(function () {
               vm.sentMsg = gettextCatalog.getString('Vzkaz se nepodařilo odeslat kvůli chybě serveru. Omlouvám se za způsobené potíže, napište mi prosím klasický e-mail na ivana.dolezalova@gmai.com nebo mi zavolejte na 776 636 086.');
               afterSend();
            });
      }

      function orderWeb() {
         /// e-mail subject
         vm.subject = gettextCatalog.getString('Objednávka webového balíčku');
         /// e-mail message - keep \n characters for line break
         vm.msg = gettextCatalog.getString('Dobrý den,\n\nrád(a) bych si objednal(a) službu "Webový balíček" za jednotnou cenu 8 000 Kč. Kontaktujte mne, prosím, abychom se domluvili na podrobnostech.\n\nS pozdravem\n');

         scrollToContact();
      }

      function orderFreelancer() {
         /// e-mail subject
         vm.subject = gettextCatalog.getString('Poptávka freelancera');
         /// e-mail message - keep \n characters for line break
         vm.msg = gettextCatalog.getString('Dobrý den,\n\nměl(a) bych zájem si Vás najmout na svůj projekt. Kontaktujte mne, prosím, abychom se  domluvili na podrobnostech.\n\nS pozdravem\n');

         scrollToContact();
      }

      function showSentMsg() {
         return vm.sentMsg !== '';
      }

      /** @private */
      function afterSend() {
         vm.sendInProgress = false;
         clearForm();
         reloadCaptcha();
      }

      /** @private */
      function reloadCaptcha() {
         vm.captchaFirst = Math.floor((Math.random() * 10) + 1);
         vm.captchaSecond = Math.floor((Math.random() * 10) + 1);
      }

      /** @private */
      function scrollToContact() {
         $document.scrollToElementAnimated(angular.element(document.getElementById('contact')));
      }

      /** @private */
      function clearForm() {
         vm.invalidCheck = false;
         vm.name = '';
         vm.email = '';
         vm.phone = '';
         vm.subject = '';
         vm.msg = '';
         vm.check = '';
         $scope.contactForm.$setPristine();
      }

   }

})
();
