'use strict';

describe('Creditplans E2E Tests:', function () {
  describe('Test Creditplans page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/creditplans');
      expect(element.all(by.repeater('creditplan in creditplans')).count()).toEqual(0);
    });
  });
});
