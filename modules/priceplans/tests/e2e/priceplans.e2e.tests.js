'use strict';

describe('Priceplans E2E Tests:', function () {
  describe('Test Priceplans page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/priceplans');
      expect(element.all(by.repeater('priceplan in priceplans')).count()).toEqual(0);
    });
  });
});
