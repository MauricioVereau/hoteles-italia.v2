import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  lang = signal<'es' | 'en'>(localStorage.getItem('lang') === 'en' ? 'en' : 'es');
  translations = signal<Record<string, any>>({});

  constructor() {
    this.loadTranslations(this.lang());
  }

  get currentLang() {
    return this.lang.asReadonly();
  }

  async changeLang(lang: 'es' | 'en') {
    if (lang === this.lang()) return;
    this.lang.set(lang);
    localStorage.setItem('lang', lang);
    await this.loadTranslations(lang);
  }

  async loadTranslations(lang: 'es' | 'en') {
    const response = await fetch(`assets/i18n/${lang}.json`);
    this.translations.set(await response.json());
  }

  t(key: string): string {
    const keys = key.split('.');
    let value: any = this.translations();
    for (const k of keys) {
      value = value?.[k];
      if (!value) return key;
    }
    return value;
  }
}
