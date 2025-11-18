
import { Component, inject, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '../../services/translate.service';
import { TarifasModal } from "./tarifas-modal/tarifas-modal";
import { Tarifa } from '../../interfaces/Tarifa';
import { TARIFAS_DATA } from '../../data/tarifas.data';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-tarifas',
  standalone: true,
  imports: [FontAwesomeModule, TarifasModal, CurrencyPipe],
  templateUrl: './tarifas.html'
})
export class Tarifas {

  iconEye = faEye;
  translate = inject(TranslateService);

  /** Lista de tarifas */
  tarifas = signal<Tarifa[]>(TARIFAS_DATA)

  /** Tarifa seleccionada para mostrar en el modal */
  selected = signal<Tarifa | null>(null);

  // Abre el dialog nativo y marca la tarifa seleccionada
  mostrarModalTarifa(t: Tarifa): void {
    this.selected.set(t);
    queueMicrotask(() => {
      const dlg = document.getElementById('room_modal') as HTMLDialogElement | null;
      if (dlg && !dlg.open) dlg.showModal();
    });
  }

  cerrarModal(){
    const dlg = document.getElementById('room_modal') as HTMLDialogElement | null;
    if( dlg && dlg.open) dlg.close();
    this.selected.set(null);
  }

}
