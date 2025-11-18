import { Component, inject, input, Output, EventEmitter, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'nav-links',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-links.html'
})
export class NavLinks {
  disableActive = input(false);
  translate = inject(TranslateService);
}
