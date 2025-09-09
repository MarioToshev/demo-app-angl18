import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Employee } from './types/Employee';
import e, { response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServiceService {
  private http = inject(HttpClient);

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      'http://localhost:5056/Employee'
    );
  }

  getEmployeeByEmail(email: string) {
    return this.http.get<{ firstName: string; lastName: string; email: string }[]>(
      `http://localhost:5056/Employee/${email}`
    );
  }

  deleteEmployeeByEmail(employee: Employee) {
    console.log('Deleting employee with email:', employee.email);
    return this.http.delete(`http://localhost:5056/Employee/delete/${employee.email}`);
  }

  addEmployee(employee: Employee){
    console.log('Adding employee:', employee);
    return this.http.post<Employee>('http://localhost:5056/Employee/create', {firstname: employee.firstName, lastname: employee.lastName, email: employee.email});
  }

  updateEmployee(employee: { firstName: string; lastName: string; email: string }) {
    return this.http.put('http://localhost:5056/Employee/update', employee);
  }
}
