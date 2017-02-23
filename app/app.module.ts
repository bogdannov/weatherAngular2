import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { WeatherComponent } from './weather.component';
import { CurrentComponent } from './current-area.component'
import { WeatherService } from './weather.service';
import { HttpModule, JsonpModule } from '@angular/http';

@NgModule({
  imports: [ 
    BrowserModule,
    HttpModule,
    JsonpModule
    ],
  declarations: [
    AppComponent,
    HomeComponent,
    WeatherComponent,
    CurrentComponent
  ], 
  bootstrap: [ AppComponent ],
  providers: [ WeatherService ]
})
export class AppModule {}