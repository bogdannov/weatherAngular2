// Main script
import 'rxjs';
import 'zone.js/dist/zone';
import 'reflect-metadata';

import { AppModule } from './app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);

if (process.env.ENV === 'production') {
  // Production
} else {
  // Development
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}