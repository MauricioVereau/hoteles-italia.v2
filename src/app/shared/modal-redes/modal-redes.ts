import { Component, inject } from '@angular/core';
import { TranslateService } from '../../services/translate.service';
import { RedesLinks } from "../../components/redes-links/redes-links";

@Component({
  selector: 'modal-redes',
  imports: [RedesLinks],
  templateUrl: './modal-redes.html'
})
export class ModalRedes {
  translate = inject(TranslateService)
}
