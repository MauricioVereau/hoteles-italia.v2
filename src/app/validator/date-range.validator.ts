// date-range.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const dateRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const checkin = control.get('checkin')?.value;
  const checkout = control.get('checkout')?.value;
  // Si hay checkin pero no checkout, no hay error (aún)
  if (!checkin) return null;
  // Si hay checkout, validar que sea después del checkin
  if (checkout) {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    if (checkoutDate <= checkinDate) return { dateRangeInvalid: true };
  }
  return null;
};
