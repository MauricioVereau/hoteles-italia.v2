import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { routes } from './app.routes';
import { TranslateService } from './services/translate.service';
import { provideHttpClient, withFetch } from '@angular/common/http';

export function initTranslate() {
  const translate = inject(TranslateService);
  return translate.loadTranslations(
    localStorage.getItem('lang') === 'en' ? 'en' : 'es'
  );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    FontAwesomeModule,
    { provide: 'NG_WARNINGS_SUPPRESS_LCP', useValue: true },
    provideAppInitializer(initTranslate),
    provideHttpClient(withFetch())
  ]
};
