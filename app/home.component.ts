/**
 * Detect on session data.
 * Save in session.
 * Add new city.
 */

import { Component, OnInit } from '@angular/core';

import { WeatherService } from './weather.service';

@Component({
  selector: 'home',
  template: `
  <div>
    <div class="form-group">
        <label for="choose-city">Введите город</label>
        <input id="choose-city" placeholder="Начните вводить название города" (keyup)="onKey($event.target.value)" class="form-control">
        <ul class="list-group">
            <li class="list-group-item list-group-item-action" *ngIf="autocomleteItems.length == 0">Нет результатов</li>
            <li class="list-group-item list-group-item-action" *ngFor="let item of autocomleteItems" (click)="onChange(item)">
                {{item.Country.LocalizedName}} - {{item.LocalizedName}}
            </li>
        </ul>
    </div>
    <div class="row">
        <div  class="col-md-6 weather" *ngFor="let city of cities; let i = index" [cityInfo]="city" [index]="i" (removeCity)="onRemove($event)"></div>
    </div>

  </div>
  `
})
export class HomeComponent  implements OnInit {

  constructor(private whetherService: WeatherService) {}
  // list of items for autocomplete
  autocomleteItems = [];
  //current lang
  lang:string = 'ru';
  // list of added cities
  cities = [];
  //options for geolocation request.
  options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
/**
 * Request permission for geolocation.
 * Parse localstorage and get city from there.
 */
  ngOnInit(){
       /**
     * Check on storage for cities;
     * if not null declarate them.
     */
    let storageCities = JSON.parse(localStorage.getItem("cities"));
    if(storageCities) this.cities = storageCities;

    navigator.geolocation.getCurrentPosition(
        pos=>{
            this.successGeo(pos);
        }, 
        this.errorGeo, 
        this.options
    );
  }
/**
 * If we have permission on geolocation.
 * Call function with request.
 * and add into array with city.
 * @param crd - coordinate which get.
 * @param lat - latitude coord.
 * @param lon - longitude coord.
 */
successGeo(pos) {
        let crd = pos.coords;
        let lat = crd.latitude;
        let lon = crd.longitude;
        this.whetherService.getbyLocation(lat, lon).subscribe(data => {
            if(this.checkForUnic(data)) return;
            this.onChange(data, false);
        });
    };
    /**
     * On error permission geolocation.
     */
    errorGeo(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    /**
     * Check for the uniqueness of the city.
     */
    checkForUnic(city){
        let result = this.cities.find(el =>{
            if(el.locationKey == city.Key){
                return true;
            }
        })
        return result;
    }

    /**
     * Function on keyup input with name of city.
     * check for space and remove them.
     * determ language.
     * send request with query.
     */
    onKey(query){
        query = query.replace(/\s+/g, '');

        if(!query.length){
            this.autocomleteItems= [];
            return;
        }

        if (/^[a-zA-Z]+$/.test(query)) {
            this.lang = "en";
        } else{
            this.lang = "ru";
        }
        this.whetherService.getAutoComplete(query, this.lang).subscribe(data => {
            this.autocomleteItems = data;
        });
    }
    /**
     * create new object with parametrs.
     * and add into array.
     */
    onChange(item, shouldSave:boolean = true){
        let city = new Object();
        city = {
            locationKey: item.Key,
            lang : this.lang,
            country: item.Country.LocalizedName,
            cityName: item.LocalizedName
        }
        this.cities = [...this.cities, ...[city]];

        if(shouldSave){
            localStorage.setItem("cities", JSON.stringify(this.cities));
        }

    }
    /**
     * Removing city from list.
     * Remove from array and localstorage.
     */
    onRemove(index){
        this.cities.splice(index, 1);
        localStorage.setItem("cities", JSON.stringify(this.cities));
    }


}