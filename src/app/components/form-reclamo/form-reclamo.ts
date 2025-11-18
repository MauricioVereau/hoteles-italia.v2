import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, output, signal } from '@angular/core';
import { TranslateService } from '../../services/translate.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'form-reclamo',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-reclamo.html'
})
export class FormReclamo {

  translate = inject(TranslateService);
  fecha = signal({ dia: new Date().getDate(), mes: new Date().getMonth() + 1, anio: new Date().getFullYear() });

    // Input para recibir datos existentes (en caso de edición)
  formData = input<any>({});

  // Output para emitir cuando el formulario es válido y enviado
  formSubmitted = output<any>();

  private fb = inject(FormBuilder);

  reclamoForm = this.fb.group({
    sede: ['Arica', Validators.required],
    tipoDoc: ['', Validators.required],
    nroDoc: ['', Validators.required],
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
    direccion: ['', [Validators.required]],
    tipoServ: ['', Validators.required],
    monto: [''],
    descServ: [''],
    tipo: ['', Validators.required],
    desc: ['', Validators.required],
    pedidoCli: ['']
  });

  ngOnInit() {
    // Si hay datos existentes, llenar el formulario
    const existingData = this.formData();
    if (Object.keys(existingData).length > 0) {
      this.reclamoForm.patchValue(existingData);
    }
  }

  onSubmit(): void {
    if (this.reclamoForm.invalid) {
      this.reclamoForm.markAllAsTouched();
      return;
    }

    // Emitir los datos del formulario al componente padre
    this.formSubmitted.emit(this.reclamoForm.value);
  }

  // Getter para acceder fácilmente a los controles en el template
  get f() {
    return this.reclamoForm.controls;
  }
}
