(function () {
  'use strict';

  angular
    .module('core')
    .filter('jDate', jDate);

  jDate.$inject = [/*Example: '$state', '$window' */];

  function jDate(/*Example: $state, $window */) {
    return function (input) {
      // J date directive logic
      // ...
        moment.loadPersian({usePersianDigits: true,dialect: 'persian-modern'});
      return moment(input).format('jYYYY/jMMMM/jDD');
    };
  }
})();
