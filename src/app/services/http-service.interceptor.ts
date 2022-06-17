import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { SharedService } from './shared.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpServiceInterceptor implements HttpInterceptor {

  private pendingCalls: number = 0;
  constructor(
    private readonly _toastr: ToastrService,
    private readonly _sharedService: SharedService,
  ) {}
  intercept(
    request: HttpRequest<any>, next: HttpHandler
  ) : Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders:{
        'Content-Type': 'application/json; charset=utf-8',
        'dataType': 'json',
      }});

    !this.pendingCalls && this._sharedService.showLoader();
    this.pendingCalls++;
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 500){
          this._toastr.error('Error: Internal server error');
        }
        // If it is not an authentication Error: just throw it
        return throwError(() => err);
      }),
      finalize(() => {
        this.pendingCalls--;
        if(!this.pendingCalls)
        this._sharedService.hideLoader();
      })
    );
  }
}
