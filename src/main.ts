import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { importProvidersFrom } from '@angular/core';

import { appConfig } from './app/app.config'; 

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
  ]
}).catch(err => console.error(err));

