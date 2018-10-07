'use strict';

describe('Usercredits E2E Tests:', function () {
  describe('Test Usercredits page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/usercredits');
      expect(element.all(by.repeater('usercredit in usercredits')).count()).toEqual(0);
    });
  });
});
