'use strict';

describe('Gcodeplans E2E Tests:', function () {
  describe('Test Gcodeplans page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/gcodeplans');
      expect(element.all(by.repeater('gcodeplan in gcodeplans')).count()).toEqual(0);
    });
  });
});
