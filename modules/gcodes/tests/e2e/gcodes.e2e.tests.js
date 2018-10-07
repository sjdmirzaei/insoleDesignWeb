'use strict';

describe('Gcodes E2E Tests:', function () {
  describe('Test Gcodes page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/gcodes');
      expect(element.all(by.repeater('gcode in gcodes')).count()).toEqual(0);
    });
  });
});
