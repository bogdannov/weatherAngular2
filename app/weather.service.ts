import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {
  constructor (
    private http: Http
  ) {}

  apikey:string = 'JsBMiT8ABzjGodW2Q1IoiMYGkLgSILCr'; 
  /**
   * Request for city by query.
   * return list of variants.
   * @param query - string.
   * @param lang - language which request go and will response.
   */
  getAutoComplete(query:string, lang:string) {
    return this.http.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.apikey}&q=${query}&language=${lang}`)
    .map((res:Response) => res.json());
  }
  /**
   * Request for city information by geoposition.
   * return Object.
   * @param lat - geoposition latitude.
   * @param lat - geoposition longitude; 
   */
  getbyLocation(lat, lon){
      return this.http.get(` http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${this.apikey}&q=${lat}%2C${lon}&language=ru`)
    .map((res:Response) => res.json());
  }
  /**
   * Getting information about weather.
   * @param key - location key.
   * @param lang - language which request go and will response.
   * @param details - need details or not.
   */
  getWeather(key, lang, details){
      return this.http.get(`http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${this.apikey}&language=${lang}&details=${details}`)
    .map((res:Response) => res.json());
  }

}