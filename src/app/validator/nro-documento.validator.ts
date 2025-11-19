import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const nroDocumentoValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control || !control.parent) return null;

  const tipoDoc = control.parent.get('tipoDoc')?.value;
  const nroDoc = control.value;

  if (!tipoDoc || !nroDoc) return null;

  switch (tipoDoc) {
    case 'DNI':
      return /^\d{8}$/.test(nroDoc) ? null : { invalidDNI: true };

    case 'Pasaporte':
      return /^[a-zA-Z0-9]{9}$/.test(nroDoc) ? null : { invalidPasaporte: true };

    case 'Carnet de Extranjería':
      return /^[a-zA-Z0-9]{9}$/.test(nroDoc) ? null : { invalidCarnet: true };

    case 'RUC':
      if (!/^(10|15|17|20)\d{9}$/.test(nroDoc)) return { invalidRUCFormat: true };
      return validarRUC(nroDoc) ? null : { invalidRUCDigit: true };

    default:
      return null;
  }
};

function validarRUC(ruc: string): boolean {
  const multipliers = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  const sum = multipliers.reduce((acc, m, i) => acc + m * parseInt(ruc[i]), 0);
  const remainder = sum % 11;
  const checkDigit = remainder === 0 ? 0 : 11 - remainder;
  return checkDigit === parseInt(ruc[10]);
}
