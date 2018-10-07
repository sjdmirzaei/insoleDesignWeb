'use strict';

describe('Softwareupdates E2E Tests:', function () {
  describe('Test Softwareupdates page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/softwareupdates');
      expect(element.all(by.repeater('softwareupdate in softwareupdates')).count()).toEqual(0);
    });
  });
});
