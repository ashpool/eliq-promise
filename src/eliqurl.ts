import {toISOHour} from "./date";

export class EliqUrl {
  config: any;

  constructor (config: { eliqAccesstoken: string }) {
    if (!config || !config.eliqAccesstoken) {
      throw new Error('config.eliqAccesstoken must be configured');
    }
    this.config = config;
  }

  public baseUrl = () => (this.config.eliqUrl || 'https://my.eliq.io/api/').replace(/\/?$/, '');

  public accesstoken = () => '?accesstoken=' + this.config.eliqAccesstoken;

  public now = () => this.baseUrl() + '/datanow' + this.accesstoken();

  public from = (startdate: Date, resolution: string) => this.baseUrl() + '/data' +this.accesstoken() + '&startdate=' + toISOHour(startdate).slice(0, -1) + '&intervaltype=' + resolution;

  public fromTo = (startdate: Date, enddate: Date, resolution: string) => this.baseUrl() + '/data' + this.accesstoken() + '&startdate=' + toISOHour(startdate).slice(0, -1) + '&enddate=' + toISOHour(enddate).slice(0, -1) + '&intervaltype=' + resolution;
}
