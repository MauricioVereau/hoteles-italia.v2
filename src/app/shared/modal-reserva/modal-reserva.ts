import { Component, inject } from '@angular/core';
import { FormReserva } from "../../components/form-reserva/form-reserva";
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'modal-reserva',
  imports: [FormReserva],
  templateUrl: './modal-reserva.html'
})
export class ModalReserva {

  translate = inject(TranslateService);

}
