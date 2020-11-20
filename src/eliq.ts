import request from 'request';
import * as date from './date';
import {EliqUrl} from './eliqurl';


export class EliqClient {
  eliqUrl: any;

 constructor (config: any) {
    this.eliqUrl = new EliqUrl(config);
 }

  public fetchData = async (url: string) => {
    return new Promise(function (resolve, reject) {
      const options = {
        url: url,
        json: true,
        timeout: 3000
      };
      request(options, function (error, response, body) {
        if (!error && response && (response.statusCode === 200 || response.statusCode === 201)) {
          resolve(body);
        } else {
          error = error || new Error('Got status code ' + response.statusCode + ' for ' + options.url);
          reject(error);
        }
      });
    });
  }

  public getNow = () => this.fetchData(this.eliqUrl.now());

  public getFrom = async (age: any, resolution: any) => {
    const startDate = date.hoursAgoFromNow(age);
    return this.fetchData(this.eliqUrl.from(startDate, resolution));
  }

  public getFromTo = async (startDate: any, endDate: any, resolution: any) => this.fetchData(this.eliqUrl.fromTo(startDate, endDate, resolution));
}
