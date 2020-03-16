import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  getAllEmployees() {
    const url = environment.apiEndpoint + 'employees/'
    return this.http.get(url)
  }
  
  getSingleEmployee(id: string) {
    const url = environment.apiEndpoint + 'employees/employee/' + id
    return this.http.get(url)
  }

  deleteEmployee(employee: Employee){
    const url = environment.apiEndpoint + 'employees/' + employee.id;
    return this.http.delete(url, {responseType: 'text'})
  }

  createEmployee(employee: Employee) {
    const url = environment.apiEndpoint + 'employees/'
    return this.http.post(url, {
      firstname: employee.firstname,
      lastname: employee.lastname,
      jobtitle: employee.jobtitle,
      department: employee.department
    })
  }

  updateEmployee(employee) {
    const url = environment.apiEndpoint + 'employees/employee/' + employee.id
    return this.http.put(url, employee, {responseType: 'text'})
  }
}
