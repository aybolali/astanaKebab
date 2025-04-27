/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

console.log('API URL:', environment.astanaKebabApiUrl);

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));
