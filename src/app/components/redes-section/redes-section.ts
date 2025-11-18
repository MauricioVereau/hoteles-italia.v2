import { NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { TranslateService } from '../../services/translate.service';
import { RedesLinks } from "../redes-links/redes-links";

@Component({
  selector: 'redes-section',
  imports: [RedesLinks],
  templateUrl: './redes-section.html'
})
export class RedesSection {

  translate = inject(TranslateService);


}
