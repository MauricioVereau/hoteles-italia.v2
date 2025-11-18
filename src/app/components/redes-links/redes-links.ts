import { NgStyle, NgClass } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TranslateService } from '../../services/translate.service';
import { SOCIALLINKS_DATA } from '../../data/socialLinks.data';

@Component({
  selector: 'redes-links',
  imports: [NgStyle, FaIconComponent, NgClass],
  templateUrl: './redes-links.html'
})
export class RedesLinks {

  translate = inject(TranslateService);

  layout = input<'grid' | 'column'>('grid');

  socialLinks = SOCIALLINKS_DATA;

}
