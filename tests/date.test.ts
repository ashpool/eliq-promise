import {hoursAgoFromNow} from "../src";

describe('date',  () => {
  describe('#hoursFromNow',  () => {
    const h = 60 * 60 * 1000;
    const roundTime = (date: Date) => parseInt(('' + date.getTime()).substr(0, ('' + date.getTime()).length - 4) + '0000');
    const now = roundTime(new Date());

    it('substracts 0 hours',  () => {
      expect(roundTime(hoursAgoFromNow(0))).toEqual(now);
    });
    it('substracts 1 hour',  () => {
      expect(roundTime(hoursAgoFromNow(1))).toEqual(now - h);
    });
    it('substracts 23 hours',  () => {
      expect(roundTime(hoursAgoFromNow(23))).toEqual(now - 23 * h);
    });
    it('substracts 24 hours',  () => {
      expect(roundTime(hoursAgoFromNow(24))).toEqual(now - 24 * h);
    });
    it('substracts 25 hours',  () => {
      expect(roundTime(hoursAgoFromNow(25))).toEqual(now - 25 * h);
    });
  });
});
