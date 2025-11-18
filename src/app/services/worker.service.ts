import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { WorkerResponse } from '../interfaces/WorkerResponse';
import { env } from '../../env/env';

@Injectable({ providedIn: 'root' })
export class WorkerService {

  private contactoWorker = env.contactoWorker;
  private reservaWorker= env.reservaWorker;
  private reclamoWorker= env.reclamoWorker;
  private http = inject(HttpClient)

  contactoForm(payload: any){
    return this.http.post<WorkerResponse>(this.contactoWorker, payload);
  }

  reservaForm(payload: any){
    return this.http.post<WorkerResponse>(this.reservaWorker, payload);
  }

  reclamoForm(payload: any){
    return this.http.post<WorkerResponse>(this.reclamoWorker, payload);
  }
}
