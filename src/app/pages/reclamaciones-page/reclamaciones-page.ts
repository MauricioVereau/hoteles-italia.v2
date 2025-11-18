import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormReclamo } from "../../components/form-reclamo/form-reclamo";
import { TranslateService } from '../../services/translate.service';
import { CommonModule, NgClass } from '@angular/common';
import { TurnstileContainer } from "../../components/turnstile-container/turnstile-container";

@Component({
  selector: 'app-reclamaciones-page',
  imports: [FormReclamo, CommonModule, TurnstileContainer],
  templateUrl: './reclamaciones-page.html'
})
export class ReclamacionesPage {

  translate = inject(TranslateService);

  // Signals para controlar el estado
  currentStep = signal<number>(1);
  formData = signal<any>({});
  isSubmitting = signal(false);
  codigoReclamo = signal('');

  getStepName(step: number): string {
    const steps = {
      1: 'Datos del Reclamo',
      2: 'Revisar Información',
      3: 'Verificación',
      4: 'Completado'
    };
    return steps[step as keyof typeof steps] || `Paso ${step}`;
  }

  onFormSubmitted(formData: any): void {
    this.formData.set(formData);
    this.currentStep.set(2);
  }

  onConfirmSubmit(): void {
    this.currentStep.set(3);
  }

  onTokenGenerated(token: string): void {
    if (!token) {
      // Manejar error del token
      console.log('Error al generar el token');
      return;
    }
    this.submitForm(token);
  }

  private submitForm(token: string): void {
    this.isSubmitting.set(true);

    // Aquí iría tu llamada al servicio WorkerService
    const payload = {
      ...this.formData(),
      tokenTurnstile: token,
      fecha: this.getFormattedDate(),
      navegador: navigator.userAgent,
      origen: 'form-reclamo'
    };

    console.log('reclamo', payload);

    // Simulamos el envío (reemplaza con tu servicio real)
    setTimeout(() => {
      this.generarCodigoUnico();
      this.isSubmitting.set(false);
      this.currentStep.set(4);
    }, 10000);

    // Ejemplo con tu servicio real (descomenta y adapta):
    /*
    this.workerService.reclamoForm(payload).pipe(
      tap(res => {
        if (res?.success) {
          this.generarCodigoUnico();
          this.currentStep.set(4);
        }
      }),
      catchError(err => {
        console.error('Error:', err);
        // Manejar error - quizás volver al paso 3
        return of(null);
      }),
      finalize(() => this.isSubmitting.set(false))
    ).subscribe();
    */
  }

  private getFormattedDate(): string {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  private generarCodigoUnico(): void {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    this.codigoReclamo.set(`REC-${timestamp}-${random}`.toUpperCase());
  }

  resetProcess(): void {
    this.currentStep.set(1);
    this.formData.set({});
    this.codigoReclamo.set('');
  }

}
