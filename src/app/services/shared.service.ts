import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public isLoading = new Subject<boolean>();
  
  constructor() { }

  public showLoader() {
    this.isLoading.next(true);
  }
  public hideLoader() {
    this.isLoading.next(false);
  }
}
