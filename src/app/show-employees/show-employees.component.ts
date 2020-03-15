import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';
import { EmployeesService } from '../services/employees.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-show-employees',
  templateUrl: './show-employees.component.html',
  styleUrls: ['./show-employees.component.css']
})
export class ShowEmployeesComponent implements OnInit {

  constructor(
    private employeesService: EmployeesService,private http: HttpClient, private router: Router, private formBuilder: FormBuilder
  ) {}
  title = 'employees-app';
  allEmployees: Object;
  newEmployee;
  updating: boolean;
  employeeForm: FormGroup;
  
  ngOnInit() {
    this.employeeForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      jobtitle: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required)
    })
    this.updating = false;
  this.getAllEmployees();

  }

  getAllEmployees() {
    this.employeesService.getAllEmployees().subscribe(employees => {
      this.allEmployees = employees
    }, error => {
      console.log('getAllEmployees', error)
    })
  }

  deleteEmployee(employee: Employee){
    const url = environment.apiEndpoint + 'employees/' + employee.id;
    this.employeesService.deleteEmployee(employee).subscribe(result => {
      console.log('Employee deleted');
      this.getAllEmployees();
    }, error => {
      console.log('deleteEmployee',error)
    });
  }

  createEmployee(employeeFormValue) {
    const url = environment.apiEndpoint + 'employees/'
    this.employeesService.createEmployee(employeeFormValue).subscribe(result => {
      console.log('New Employee added');
      // this.allEmployees = [];
      this.getAllEmployees();
    }, error => console.log(error))
  }

  updateEmployee(employee) {
    this.router.navigate(['/edit'])
    // const url = environment.apiEndpoint + 'employees/' + 42
    // this.http.put(url,  {
    //   firstname: this.newEmployeeFirstname,
    //   lastname: this.newEmployeeLastname,
    //   jobtitle: this.newEmployeeJobtitle,
    //   department: this.newEmployeeDepartment
    // }, {responseType: 'text'}).subscribe(result => console.log(result))
  }

  switchUpdating() {
    this.updating = !this.updating;
  }

}
