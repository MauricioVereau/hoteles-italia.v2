// import { CommonModule } from '@angular/common';
// import { Component, computed, inject, signal } from '@angular/core';
// import { TranslateService } from '../../services/translate.service';
// import { WorkerService } from '../../services/worker.service';
// import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { faCheckCircle, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
// import { toSignal } from '@angular/core/rxjs-interop';
// import { catchError, finalize, of, tap } from 'rxjs';
// import { TurnstileContainer } from "../turnstile-container/turnstile-container";

// @Component({
//   selector: 'form-reclamo',
//   imports: [CommonModule, ReactiveFormsModule, TurnstileContainer],
//   templateUrl: './form-reclamo.html'
// })
// export class FormReclamo {

//   translate = inject(TranslateService);

//   fecha = signal({
//     dia: new Date().getDate(),
//     mes: new Date().getMonth() + 1,
//     anio: new Date().getFullYear()
//   });

//   worker = inject(WorkerService);
//   private fb = inject(FormBuilder);

//   iconPlane = faPaperPlane;
//   iconSuccess = faCheckCircle;

//   tokenTurnstile = '';
//   showTurnstile = signal(false);

//   msgSuccess = signal(false);
//   msgError = signal(false);

//   reclamoForm = this.fb.group({
//     sede: ['Arica', Validators.required],
//     tipoDoc: ['', Validators.required],
//     nroDoc: ['', Validators.required],
//     nombre: ['', [Validators.required, Validators.minLength(2)]],
//     email: ['', [Validators.required, Validators.email]],
//     phone: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
//     direccion: ['', [Validators.required]],
//     tipoServ: ['', Validators.required],
//     monto: [''],
//     descServ: [''],
//     tipo: ['', Validators.required],
//     desc: ['', Validators.required],
//     pedidoCli: ['']
//   }) as
//     FormGroup<{
//       sede: FormControl<string | null>,
//       tipoDoc: FormControl<string | null>,
//       nroDoc: FormControl<string | null>,
//       nombre: FormControl<string | null>,
//       email: FormControl<string | null>,
//       phone: FormControl<string | null>,
//       direccion: FormControl<string | null>,
//       tipoServ: FormControl<string | null>,
//       monto: FormControl<string | null>,
//       descServ: FormControl<string | null>,
//       tipo: FormControl<string | null>,
//       desc: FormControl<string | null>,
//       pedidoCli: FormControl<string | null>
//     }>
//     ;

//   isSubmitting = signal(false);

//   formStatus = toSignal(this.reclamoForm.statusChanges, { initialValue: this.reclamoForm.status });

//   isDisabled = computed(() => this.formStatus() !== 'VALID' || this.isSubmitting() || this.showTurnstile())

//   get f() {
//     return this.reclamoForm.controls;
//   }

//   guardarToken(token: string): void {
//     if (!token) {
//       this.msgError.set(true);
//       return;
//     }

//     this.tokenTurnstile = token;
//     this.enviarFormulario();
//   }

//   onSubmit(): void {
//     if (this.reclamoForm.invalid) {
//       this.reclamoForm.markAllAsTouched();
//       return;
//     }
//     this.showTurnstile.set(true);
//   }

//   enviarFormulario(): void {
//     if (!this.tokenTurnstile) {
//       this.msgError.set(true);
//       return;
//     }

//     /**Formateamos la fecha antes de  formato '2025-12-31' */
//     const { dia, mes, anio } = this.fecha();
//     const fechaFormateada = `${anio}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;

//     const payload = { ...this.reclamoForm.value,fecha: fechaFormateada,tokenTurnstile: this.tokenTurnstile, navegador: navigator.userAgent, origen: 'form-reclamo' };
//     console.log('datos:', payload);

//     this.isSubmitting.set(true);
//     this.msgError.set(false);
//     this.msgSuccess.set(false);

//     this.worker.reclamoForm(payload).pipe(
//       tap(res => {
//         if (res?.success) {
//           this.msgSuccess.set(true);
//           this.resetForm();
//           setTimeout(() => this.msgSuccess.set(false), 5000);
//         } else if (res?.error) {
//           this.msgError.set(true);
//           setTimeout(() => this.msgError.set(false), 5000);
//         }
//       }),
//       catchError(err => {
//         this.msgError.set(true);
//         setTimeout(() => this.msgError.set(false), 5000);
//         console.error('API error', err.error);
//         return of(null);
//       }),
//       finalize(() => this.isSubmitting.set(false))
//     ).subscribe();
//   }

//   private resetForm(): void {
//     this.reclamoForm.reset();
//     this.tokenTurnstile = '';
//     this.showTurnstile.set(false);
//   }

// }
