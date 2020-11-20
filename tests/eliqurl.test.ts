import {EliqUrl} from '../src';

describe('eliqurl', function () {
  it('throws an error if accesstoken is not configured', () => {
    // @ts-ignore
    expect(() => new EliqUrl({})).toThrow();
  });

  describe('#now', function () {
    it('reads config.Url and accessToken', () => {
      const config = {eliqUrl: 'https://eliq.url', eliqAccesstoken: 'xxxxx'};
      const eliqurl = new EliqUrl(config);
      expect(eliqurl.now()).toEqual('https://eliq.url/datanow?accesstoken=xxxxx');
    });
    it('has a default url', () => {
      const config = {eliqAccesstoken: 'xxxxx'};
      const eliqurl = new EliqUrl(config);
      expect(eliqurl.now()).toEqual('https://my.eliq.io/api/datanow?accesstoken=xxxxx');
    });
  });

  describe('#from', () => {
    it('reads config.eliqUrl and accessToken', () => {
      const config = {eliqUrl: 'https://eliq.url', eliqAccesstoken: 'xxxxx'};
      const eliqurl = new EliqUrl(config);
      const startdate = new Date('2012-11-04 17:30:15 GMT');
      expect(eliqurl.from(startdate, '6min'))
        .toEqual('https://eliq.url/data?accesstoken=xxxxx&startdate=2012-11-04T17:00:00.000&intervaltype=6min');
    });
  });

  describe('#fromTo', () => {
    it('reads config.eliqUrl and accessToken', () => {
      const config = {eliqUrl: 'https://eliq.url', eliqAccesstoken: 'xxxxx'};
      const eliqurl = new EliqUrl(config);
      const startdate = new Date('2012-11-03 17:30:15 GMT');
      const enddate = new Date('2012-11-04 17:30:15 GMT');
      expect(eliqurl.fromTo(startdate, enddate, 'day')).toEqual('https://eliq.url/data?accesstoken=xxxxx&startdate=2012-11-03T17:00:00.000&enddate=2012-11-04T17:00:00.000&intervaltype=day');
    });
  });
});
