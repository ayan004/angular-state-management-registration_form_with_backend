import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as formDataActions from 'src/app/students/form.action';
import formData from 'src/app/students/form.model';
import studentListState from 'src/app/students/form.state';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {

  // loginForm!: FormGroup;
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  studentListObservable$: Observable<studentListState>;
  studentListSubscription: Subscription;
  allRegisteredStudents: formData[] = [];
  anyTypeOfError: Error = null;

  constructor(private store: Store<{ listOfStudent: studentListState }>, private router: Router) {
    this.studentListObservable$ = store.pipe(select('listOfStudent'));
  }

  ngOnInit() {
    this.store.dispatch(formDataActions.BeginGetformDataAction());

    this.studentListSubscription = this.studentListObservable$.pipe(
      map(x => {
        this.allRegisteredStudents = x.studentList;
        this.anyTypeOfError = x.SlError;
      })
    ).subscribe();

  }

  loginFormData() {
    for (var i = 0; i < this.allRegisteredStudents.length; i++) {
      // console.log(this.allRegisteredStudents[i].username + " " + this.allRegisteredStudents[i].password);
      if (this.allRegisteredStudents[i].username === this.loginForm.value.username && this.allRegisteredStudents[i].password === this.loginForm.value.password) {
        this.router.navigate(['datatable']);
      } else {
        document.getElementById("incorrectInputs").innerHTML = "<span>* username or password is incorrect</span>";
      }
    }
    // this.loginForm.reset();
  }

}
