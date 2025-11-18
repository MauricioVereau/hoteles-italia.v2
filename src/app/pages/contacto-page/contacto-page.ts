import { Component, inject } from '@angular/core';
import { Mapa } from "../../components/mapa/mapa";
import { RedesSection } from "../../components/redes-section/redes-section";
import { TranslateService } from '../../services/translate.service';
import { FormContacto } from "../../components/form-contacto/form-contacto";

@Component({
  selector: 'app-contacto-page',
  imports: [Mapa, RedesSection, FormContacto],
  templateUrl: './contacto-page.html'
})
export class ContactoPage {

  translate = inject(TranslateService);
}
