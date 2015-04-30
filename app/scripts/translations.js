angular.module('gettext').run(['gettextCatalog', function (gettextCatalog) {
/* jshint -W100 */
    gettextCatalog.setStrings('en_US', {"Jak se jmenujete?":"What is your name?","Na něco se tě zeptám...":"I will ask you for something...","Vítejte v mé aplikaci!":"Welcome to my app!"});
/* jshint +W100 */
}]);