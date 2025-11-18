import { Component, inject } from '@angular/core';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-turismo-page',
  imports: [],
  templateUrl: './turismo-page.html'
})
export class TurismoPage {
  translate = inject(TranslateService);

  lugares = [
    {
      img: 'assets/img/ruta-papa/catedral-chiclayo.webp',
      titulo: 'turismo.lugar1Titulo',
      descripcion: 'turismo.lugar1Descripcion'
    },
    {
      img: 'assets/img/ruta-papa/palacio-municipal.webp',
      titulo: 'turismo.lugar2Titulo',
      descripcion: 'turismo.lugar2Descripcion'
    }
    ,
    {
      img: 'assets/img/ruta-papa/santuario-de-la-paz.webp',
      titulo: 'turismo.lugar3Titulo',
      descripcion: 'turismo.lugar3Descripcion'
    }
  ]
}
