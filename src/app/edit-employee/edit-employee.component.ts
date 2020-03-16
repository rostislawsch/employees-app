import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeesService } from '../services/employees.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employeeToEdit: Employee;
  employeeForm: any;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeesService) { }

  ngOnInit(): void {
    const employeeId = this.route.snapshot.params.id;
    this.employeeService.getSingleEmployee(employeeId).subscribe(employee => {
      this.employeeToEdit = employee[0];
      console.log(this.employeeToEdit)
      this.employeeForm = new FormGroup({
        id: new FormControl(this.employeeToEdit.id),
        firstname: new FormControl(this.employeeToEdit.firstname, Validators.required),
        lastname: new FormControl(this.employeeToEdit.lastname, Validators.required),
        jobtitle: new FormControl(this.employeeToEdit.jobtitle, Validators.required),
        department: new FormControl(this.employeeToEdit.department, Validators.required)
      })
    })
  }

  saveEmployee(employee: Employee){
    this.employeeService.updateEmployee(employee).subscribe(result => {
      console.log(result)
    })
  }

}
