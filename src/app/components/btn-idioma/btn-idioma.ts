import { NgClass } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'btn-idioma',
  imports: [NgClass],
  templateUrl: './btn-idioma.html'
})
export class BtnIdioma {

  translate = inject(TranslateService);

  currentLang = computed(() => this.translate.currentLang());

  changeLang(lang: 'es' | 'en') {
    this.translate.changeLang(lang);
  }
}
