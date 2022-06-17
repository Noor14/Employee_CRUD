import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseService {

  constructor(_http: HttpClient) {
    super(_http);
   }
  
  getEmployees(): any{
    const url = `${environment.apiBaseUrl}/employees`;
    return this.get(url);
  }
  retrieveFilteredRecords(queryString: string | undefined, filteredQueryString: string): any{
    return forkJoin({
      allEmployees: this.getEmployeesByFilter(queryString),
        employees: this.getEmployeesByFilter(filteredQueryString) 
      });
  }
  retrieveAllRecords(queryString: string): any{
    return forkJoin({
      allEmployees: this.getEmployees(),
        employees: this.getEmployeesByFilter(queryString) 
      });
  }

  getEmployeesByFilter(queryString: string | undefined): any{
    const url = queryString && `${environment.apiBaseUrl}/employees?${queryString}` || `${environment.apiBaseUrl}/employees`;
    return this.get(url);
  }
  getEmployeeById(id: number): any{
    const url = `${environment.apiBaseUrl}/employees/${id}`;
    return this.get(url);
  }
  addEmployee(obj: any): any{
    const url = `${environment.apiBaseUrl}/employees`;
    return this.post(url, obj);
  }
  updateEmployee(obj: any, id: number): any{
    const url = `${environment.apiBaseUrl}/employees/${id}`;
    return this.put(url, obj);
  }
  deleteEmployee(id: number){
    const url = `${environment.apiBaseUrl}/employees/${id}`;
    return this.delete(url);
  }
}
