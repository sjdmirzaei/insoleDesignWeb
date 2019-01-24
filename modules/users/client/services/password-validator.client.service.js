(function () {
  'use strict';

  // PasswordValidator service used for testing the password strength
  angular
    .module('users.services')
    .factory('PasswordValidator', PasswordValidator);

  PasswordValidator.$inject = ['$window'];

  function PasswordValidator($window) {
    var owaspPasswordStrengthTest = $window.owaspPasswordStrengthTest;
    // var owasp= {
    //   allowPassphrases       : true,
    //   maxLength              : 128,
    //   minLength              : 6,
    //   minPhraseLength        : 10,
    //   minOptionalTestsToPass : 2,
    //   //strong: false,
    // };
    // owaspPasswordStrengthTest.config(owasp);

    var service = {
      getResult: getResult,
      getPopoverMsg: getPopoverMsg
    };

    return service;

    function getResult(password) {
      var result = owaspPasswordStrengthTest.test(password);
      return result;
    }

    function getPopoverMsg() {
      console.log(owaspPasswordStrengthTest);
      var popoverMsg = 'mnr Please enter a passphrase or password with ' + owaspPasswordStrengthTest.configs.minLength + ' or more characters, numbers, lowercase, uppercase, and special characters.';

      return popoverMsg;
    }
  }

}());
