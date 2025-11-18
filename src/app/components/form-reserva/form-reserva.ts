import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, finalize, of, tap } from 'rxjs';
import {  NgClass } from '@angular/common';

import { faConciergeBell, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '../../services/translate.service';
import { dateRangeValidator } from '../../validator/date-range.validator';
import { RadioSelector } from '../radio-selector/radio-selector';
import { RadioOption } from '../../interfaces/RadioOptions';

import { WorkerService } from '../../services/worker.service';
import "cally";
import { TurnstileContainer } from '../turnstile-container/turnstile-container';


@Component({
  selector: 'form-reserva',
  imports: [ReactiveFormsModule, FaIconComponent, RadioSelector, NgClass, TurnstileContainer],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './form-reserva.html'
})
export class FormReserva {

  today = new Date().toISOString().split('T')[0];
  showDateError = signal(false);


  private fb = inject(FormBuilder);
  translate = inject(TranslateService);
  worker = inject(WorkerService);

  iconBell = faConciergeBell;
  iconPlane = faPaperPlane;

  tokenTurnstile = '';
  showTurnstile = signal(false);

  msgSuccess = signal(false);
  msgError = signal(false);

  sedes = signal<RadioOption[]>([
    { value: '7 de Enero', label: '7 de Enero', translate: true },
    { value: 'Arica', label: 'Arica', translate: true },
  ]);

  tarifas = signal([
    { value: 'Simple', label: 'tarifas.simple.nombre', translate: true },
    { value: 'Doble', label: 'tarifas.doble.nombre', translate: true },
    { value: 'Ejecutiva', label: 'tarifas.ejecutiva.nombre', translate: true },
  ]);

  reservaForm = this.fb.group({
    sede: ['', Validators.required],
    tarifa: ['', Validators.required],
    checkin: ['', Validators.required],
    checkout: ['',Validators.required],
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    cantidad: ['', [Validators.required, Validators.min(1)]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]]
  }, { validators: dateRangeValidator });

  onSedeChange(sede: string): void {
    this.reservaForm.patchValue({ sede });
    this.reservaForm.get('sede')?.setValue(sede);
    this.reservaForm.get('sede')?.markAsTouched();
    this.reservaForm.get('sede')?.markAsDirty();
  }

  onTarifaChange(tarifa: string): void {
    this.reservaForm.patchValue({ tarifa });
    this.reservaForm.get('tarifa')?.setValue(tarifa);
    this.reservaForm.get('tarifa')?.markAsTouched();
    this.reservaForm.get('tarifa')?.markAsDirty();
  }

  isSubmitting = signal(false);

  formStatus = toSignal(this.reservaForm.statusChanges, { initialValue: this.reservaForm.status });

  isDisabled = computed(() => this.formStatus() !== 'VALID' || this.isSubmitting() || this.showTurnstile())

  get f() {
    return this.reservaForm.controls;
  }

  guardarToken(token: string): void {
    if (!token) {
      this.msgError.set(true);
      return;
    }

    this.tokenTurnstile = token;
    this.enviarFormulario();
  }

  onSubmit() {
    if (this.reservaForm.invalid) {
      this.reservaForm.markAllAsTouched();
      return;
    }
    this.showTurnstile.set(true);
  }

  enviarFormulario(): void {
    if (!this.tokenTurnstile) {
      this.msgError.set(true);
      return;
    }

    const payload = { ...this.reservaForm.value, tokenTurnstile: this.tokenTurnstile, navegador: navigator.userAgent, origen: 'form-reserva' };
    console.log('datos', payload);

    this.isSubmitting.set(true);
    this.msgError.set(false);
    this.msgSuccess.set(false);

    this.worker.reservaForm(payload).pipe(
      tap(res => {
        if (res?.success) {
          this.msgSuccess.set(true);
          this.resetForm();
          setTimeout(() => this.msgSuccess.set(false), 5000);
        } else if (res?.error) {
          this.msgError.set(true);
          setTimeout(() => this.msgError.set(false), 5000);
        }
      }),
      catchError(err => {
        this.msgError.set(true);
        setTimeout(() => this.msgError.set(false), 5000);
        console.error('API error', err.error);
        return of(null);
      }),
      finalize(() => this.isSubmitting.set(false))
    ).subscribe();
  }

  private resetForm(): void {
    this.reservaForm.reset();
    this.tokenTurnstile = '';
    this.showTurnstile.set(false);
  }

  updateDate(field: 'checkin' | 'checkout', event: any, labelId: string) {
    const value = event.target.value;

    this.reservaForm.get(field)?.setValue(value);
    this.reservaForm.get(field)?.markAsTouched();
    this.reservaForm.get(field)?.markAsDirty();

    const el = document.getElementById(labelId);
    if (el) el.innerText = value;

    if (field === 'checkin') {
      const checkout = this.reservaForm.get('checkout')?.value;

      if (checkout && new Date(checkout) <= new Date(value)) {
        this.reservaForm.get('checkout')?.setValue('');
        const checkoutText = document.getElementById('checkout-text');
        if (checkoutText) checkoutText.innerText = 'Check-Out';

        // Mostrar error manualmente
        this.showDateError.set(true);
      } else {
        this.showDateError.set(false);
      }
    } else if (field === 'checkout') {
      const checkin = this.reservaForm.get('checkin')?.value;

      if (checkin && new Date(value) <= new Date(checkin)) {
        this.showDateError.set(true);
      } else {
        this.showDateError.set(false);
      }
    }

    this.reservaForm.updateValueAndValidity();
  }

  markDateTouched(field: 'checkin' | 'checkout') {
    this.reservaForm.get(field)?.markAsTouched();
    this.reservaForm.get(field)?.markAsDirty();

    // Verificar si las fechas son válidas al abrir el calendario
    const checkin = this.reservaForm.get('checkin')?.value;
    const checkout = this.reservaForm.get('checkout')?.value;

    if (checkin && checkout && new Date(checkout) <= new Date(checkin)) {
      this.showDateError.set(true);
    } else {
      this.showDateError.set(false);
    }
  }

}
