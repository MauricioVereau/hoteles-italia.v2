import { AfterViewInit, Component, output, signal } from '@angular/core';
import { env } from '../../../env/env';

declare const turnstile: {
  render: (container: string | HTMLElement, options: {
    sitekey: string;
    theme: string;
    callback?: (token: string) => void;
  }) => string;
  getResponse: (widgetId: string) => string;
  isExpired: (widgetId: string) => boolean;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

@Component({
  selector: 'app-turnstile',
  standalone: true,
  templateUrl: './turnstile-container.html',
})
export class TurnstileContainer implements AfterViewInit {

  private widgetId!: string;

  readonly token = signal<string>('');
  tokenGenerated = output<string>();

  ngAfterViewInit(): void {
    this.widgetId = turnstile.render('#turnstile-container', {
      sitekey: env.siteKey,
      theme: 'light',
      callback: (token: string) => {
        /** aqui recibimos el token */
        console.log('token recibido:', token);
        this.token.set(token);
        this.tokenGenerated.emit(token);
      },
    });
  }

  getToken(): string {
    return turnstile.getResponse(this.widgetId);
  }

  isExpired(): boolean {
    return turnstile.isExpired(this.widgetId);
  }

  reset(): void {
    turnstile.reset(this.widgetId);
    this.token.set('');
  }

  remove(): void {
    turnstile.remove(this.widgetId);
    this.token.set('');
  }
}
