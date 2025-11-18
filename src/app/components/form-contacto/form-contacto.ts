import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateService } from '../../services/translate.service';
import { WorkerService } from '../../services/worker.service';
import { TurnstileContainer } from '../turnstile-container/turnstile-container';
import { faCheckCircle, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, finalize, of, tap } from 'rxjs';

@Component({
  selector: 'form-contacto',
  standalone: true,
  imports: [ReactiveFormsModule, TurnstileContainer, FaIconComponent],
  templateUrl: './form-contacto.html',
})
export class FormContacto {

  translate = inject(TranslateService);
  worker = inject(WorkerService);
  private fb = inject(FormBuilder);

  iconPlane = faPaperPlane;
  iconSuccess = faCheckCircle;

  tokenTurnstile = '';
  showTurnstile = signal(false);

  msgSuccess = signal(false);
  msgError = signal(false);

  contactForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
    asunto: ['', [Validators.required]],
    mensaje: ['', [Validators.required, Validators.minLength(10)]]
  }) as
    FormGroup<{
      nombre: FormControl<string | null>,
      email: FormControl<string | null>,
      phone: FormControl<string | null>,
      asunto: FormControl<string | null>,
      mensaje: FormControl<string | null>,
    }>
    ;

  isSubmitting = signal(false);

  formStatus = toSignal(this.contactForm.statusChanges, { initialValue: this.contactForm.status });

  isDisabled = computed(() => this.formStatus() !== 'VALID' || this.isSubmitting() || this.showTurnstile())

  get f() {
    return this.contactForm.controls;
  }

  guardarToken(token: string): void {
    if (!token) {
      this.msgError.set(true);
      return;
    }

    this.tokenTurnstile = token;
    this.enviarFormulario();
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.showTurnstile.set(true);
  }

  enviarFormulario(): void {
    if (!this.tokenTurnstile) {
      this.msgError.set(true);
      return;
    }

    const payload = { ...this.contactForm.value, tokenTurnstile: this.tokenTurnstile, navegador: navigator.userAgent, origen: 'form-contacto' };

    this.isSubmitting.set(true);
    this.msgError.set(false);
    this.msgSuccess.set(false);

    this.worker.contactoForm(payload).pipe(
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
    this.contactForm.reset();
    this.tokenTurnstile = '';
    this.showTurnstile.set(false);
  }
}
