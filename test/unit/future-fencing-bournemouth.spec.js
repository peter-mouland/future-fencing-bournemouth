/* Add HTML + CSS to setup page for functional testing */
require('../helper').loadAssets();

/* Require file to test */
var futureFencingBournemouth = require('../../src/scripts/future-fencing-bournemouth');

/* Start Test */
describe('future-fencing-bournemouth module can ', function () {

    it('sum an array of numbers', function () {

        expect(new futureFencingBournemouth().sum([1,2,3])).toBe(6);

    });

    it('version is attached', function () {

        expect(new futureFencingBournemouth().version).toBe('0.0.0');

    });

});