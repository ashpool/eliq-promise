/*jshint undef:false */
import  nock = require('nock');
import { EliqClient } from '../src';

describe('eliq',  () => {
  describe('#getNow',  () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('fetches createddate and power',  async () =>  {
      nock('https://my.eliq.io')
        .get('/api/datanow?accesstoken=fake')
        .reply(200, {createddate: '2015-03-10T05:38:20', power: 1285});
      const eliq = new EliqClient({eliqAccesstoken: 'fake'});
      expect(await eliq.getNow()).toEqual({createddate: '2015-03-10T05:38:20', power: 1285});
    });
    describe('#getFromTo', () => {
      it('fetches avgpower and energy', async () => {
        const result = {
          startdate: '2015-03-02T20:00:00+00:00',
          enddate: '2015-03-02T23:00:00+00:00',
          intervaltype: '6min',
          data: [{
            avgpower: 2790,
            energy: 279,
            temp_out: null,
            time_start: '2015-03-02T20:00:00',
            time_end: '2015-03-02T20:06:00'
          }]
        };
        nock('https://my.eliq.io')
          .get('/api/data?accesstoken=fake&startdate=2015-03-02T20:00:00.000&enddate=2015-03-02T23:00:00.000&intervaltype=6min')
          .reply(200, result);
        const eliq = new EliqClient({eliqAccesstoken: 'fake'});
        expect(await eliq.getFromTo(new Date('2015-03-02T20:00:00+00:00'), new Date('2015-03-02T23:00:00+00:00'), '6min'))
          .toEqual(result);
      });
    });
  });
});
