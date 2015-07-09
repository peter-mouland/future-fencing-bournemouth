/* Add HTML + CSS to setup page for functional testing */
require('../helper').loadAssets();

/* Require file to test */
var futureFencingBournemouth = require('../../src/scripts/future-fencing-bournemouth');

/* Start Test */
describe('future-fencing-bournemouth module can ', function () {

    it('print the sum to the dom', function () {
        new futureFencingBournemouth().write([1,2,3]);

        expect(document.getElementById('demo-functional').innerHTML).toBe('6');

    });

});