import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Employee} from './models/employee.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private http: HttpClient
  ) {}
  title = 'employees-app';
  allEmployees: Object;
  newEmployeeFirstname: string;
  newEmployeeLastname: string;
  newEmployeeJobtitle: string;
  newEmployeeDepartment: string;
  newEmployee;
  
  ngOnInit() {
  this.getAllEmployees();
  }

  getAllEmployees() {
    const url = environment.apiEndpoint + 'employees/'
    this.http.get(url).subscribe(employees => {
      this.allEmployees = employees
    }, error => {
      console.log('getAllEmployees', error)
    })
  }

  deleteEmployee(employee: Employee){
    const url = environment.apiEndpoint + 'employees/' + employee.id;
    this.http.delete(url, {responseType: 'text'}).subscribe(result => {
      console.log('Employee deleted');
      this.getAllEmployees();
    }, error => {
      console.log('deleteEmployee',error)
    });
  }

  createEmployee() {
    const url = environment.apiEndpoint + 'employees/'
    this.http.post(url, {
      firstname: this.newEmployeeFirstname,
      lastname: this.newEmployeeLastname,
      jobtitle: this.newEmployeeJobtitle,
      department: this.newEmployeeDepartment
    }).subscribe(result => {
      console.log('New Employee added');
      // this.allEmployees = [];
      this.getAllEmployees();
    }, error => console.log(error))
  }

  updateEmployee() {
    const url = environment.apiEndpoint + 'employees/' + 42
    this.http.put(url,  {
      firstname: this.newEmployeeFirstname,
      lastname: this.newEmployeeLastname,
      jobtitle: this.newEmployeeJobtitle,
      department: this.newEmployeeDepartment
    }, {responseType: 'text'}).subscribe(result => console.log(result))
  }
}
