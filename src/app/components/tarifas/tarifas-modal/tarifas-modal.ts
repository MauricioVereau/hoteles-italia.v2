import { Component, input, output, signal, effect, inject } from '@angular/core';
import { TranslateService } from '../../../services/translate.service';
import { Tarifa } from '../../../interfaces/Tarifa';

@Component({
  selector: 'tarifas-modal',
  templateUrl: './tarifas-modal.html'
})
export class TarifasModal {

  selected = input.required<Tarifa>();
  currentIndex = signal<number>(0);
  translate = inject(TranslateService);

  cerrar = output<void>();

  onSelect(i: number) {
    this.currentIndex.set( i );
  }

  onCerrar(){
    console.log('click cerrar');

    this.cerrar.emit();
  }

  callModalReserva(){
    this.onCerrar();
    queueMicrotask(() => {
      const dlg = document.getElementById('my_modal_3') as HTMLDialogElement | null;
      if (dlg && !dlg.open) dlg.showModal();
    });
  }

}
