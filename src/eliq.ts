import got from 'got';
import {EliqUrl} from './eliqurl';
import {hoursAgoFromNow} from "./date";

export class EliqClient {
  eliqUrl: any;

 constructor (config: any) {
    this.eliqUrl = new EliqUrl(config);
 }

  public fetchData = async (url: string) => {
    const response = await got(url);
    if (response.statusCode >= 300) {
      throw new Error(`Request to eliq failed with ${response.statusCode}`);
    }
    return JSON.parse(response.body);
  }

  public getNow = () => this.fetchData(this.eliqUrl.now());

  public getFrom = async (age: any, resolution: any) => {
    const startDate = hoursAgoFromNow(age);
    return this.fetchData(this.eliqUrl.from(startDate, resolution));
  }

  public getFromTo = (startDate: Date, endDate: Date, resolution: string) => this.fetchData(this.eliqUrl.fromTo(startDate, endDate, resolution));
}
