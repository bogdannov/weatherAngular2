import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: '.weather',
  template: `
    <div class="jumbotron" *ngIf="weatherInfo">
            <button type="button" class="close" aria-label="Close" (click)="onRemove()">
                <span aria-hidden="true">&times;</span>
            </button>
            <h1 class="display-3">{{cityInfo.cityName}}</h1>
            <p class="lead">{{cityInfo.country}}</p>
            <div class="row">
                <p class="col-md-3">{{weatherInfo.WeatherText}}</p> 
                <p class="col-md-3">
                    <img src="http://developer.accuweather.com/sites/default/files/{{currentIcon}}-s.png">
                </p>
            </div>
            <p>Температура - {{weatherInfo.Temperature.Metric.Value}} С</p>
             <div *ngIf="!details">
                <p> Для загрузки более детальной информации нажмите на кнопку ниже</p>
                <a class="btn btn-primary btn-lg" href="#" role="button" (click)="onDetails()">Детальнее</a>
            </div>
            <div *ngIf="details">
                <div class="alert alert-info">
                    <p>Давление - {{detailsInfo.Pressure.Metric.Value}} мрс</p>
                    <p>Видимость - {{detailsInfo.Visibility.Metric.Value}} км</p>
                    <p>По ощущениям - {{detailsInfo.RealFeelTemperature.Metric.Value}} С</p>
                    <p>Ветер - {{detailsInfo.Wind.Speed.Metric.Value}} км/ч</p>

                </div>
            </div>
    </div>
  `
})
export class WeatherComponent implements OnInit{

    constructor(private whetherService: WeatherService) {}
    //information about city
    @Input() cityInfo ;
    // index of this city
    @Input() index ;
    // event for removing
    @Output() removeCity: EventEmitter<any> = new EventEmitter<any>();    
    // weather information
    weatherInfo = null;
    locationKey:string;
    //language
    lang:string;
    //detail information.
    detailsInfo = [];
    details:boolean = false;
    //icon of weather.
    currentIcon;

    /**
     * call function request weather information.
     */
    ngOnInit(){
        this.locationKey = this.cityInfo.locationKey;
        this.lang = this.cityInfo.lang;
        this.getWeatherInfo()
    }

    /**
     * Check if icon name less than 10, add '0' (1 => 01)
     */
    getIcon(icon){
        if(parseInt(icon) < 10){
            return `0${icon}`;
        }
        return icon;
    }

    /**
     * request for weather info.
     */
    getWeatherInfo(){
        this.whetherService.getWeather(this.locationKey, this.lang, false).subscribe(data => {
            this.weatherInfo = data[0];
            this.currentIcon =  this.getIcon(this.weatherInfo.WeatherIcon);
        });
    }
    /**
     * request for weather info with details.
     * Can be deprecate  getWeatherInfo can be with this data.
     * but for example keep here.
     *
     */
    onDetails(){
        this.whetherService.getWeather(this.locationKey, this.lang, true).subscribe(data => {
            this.detailsInfo = data[0];
            this.details = true;
        });
    }
    /**
     * Emmit remove event.
     */
    onRemove(){
        this.removeCity.emit(this.index);
    }

}   