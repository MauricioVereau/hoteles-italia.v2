import { Component, inject, input, output } from '@angular/core';
import { RadioOption } from '../../interfaces/RadioOptions';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'radio-selector',
  standalone: true,
  imports: [],
  templateUrl: './radio-selector.html',
})
export class RadioSelector {

  title = input.required<string>();
  options = input.required<RadioOption[]>();
  name = input.required<string>();
  selectedValue = input<string>('');

  valueChange = output<string>();
  translate = inject(TranslateService);

  onOptionChange(value: string): void {
    this.valueChange.emit(value);
  }

  getDisplayLabel(option: RadioOption): string {
    return option.translate ? this.translate.t(option.label) : option.label;
  }
}
