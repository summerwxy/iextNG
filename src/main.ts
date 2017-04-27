import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import './app/ext';


if (environment.production) {
  console.log('i am enableProdMode();');
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
