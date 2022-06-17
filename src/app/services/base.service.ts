import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private readonly _http: HttpClient) { }
  
  post(url: string, data: any, optionalParam?: any) {
    return this._http.post(url, data || {}, optionalParam);
  }

  get(url: string, optionalParam?: any) {
    return  this._http.get(url, optionalParam);
  }

  put(url: string, data?: any) {
    return this._http.put(url, data);
  }

  delete(url: string, data?: any){
    return this._http.delete(url, data);
  }

}
