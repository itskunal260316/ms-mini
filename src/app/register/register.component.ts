import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { flatten } from '@angular/compiler';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(public http: HttpClient, private fb: FormBuilder) { }

  public isValidUsername = false;
  public isValidEmail = false;
  public isPasswordSame = false;

  public regForm = this.fb.group({

    fname: ['', Validators.required],
    lname: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    userpass: ['', Validators.required],
    userphone: ['', Validators.required],

  });



  userDetails = {};

  async ajaxCall() {

    this.userDetails = this.regForm.value;
    console.log(this.userDetails);

    const url = 'http://localhost:5700/adduser';
    let res = await this.http.post(url, this.userDetails).toPromise();
    if (res == "UserAdded") {
      alert("User Added");
    }
    else {
      alert("Operation Failed");
    }

  }

  username_valid = {};

  async validateUsername() {

    this.userDetails = this.regForm.value;
    const url = 'http://localhost:5700/usernameValid';
    let res = await this.http.post(url, this.userDetails).toPromise();
    if (res != 0) {
      this.isValidUsername = true;
    }
    else {
      this.isValidUsername = false;
    }
  }

  async validateEmail() {
    this.userDetails = this.regForm.value;
    const url = 'http://localhost:5700/usernameEmail';
    let res = await this.http.post(url, this.userDetails).toPromise();
    if (res != 0) {
      this.isValidEmail = true;
    }
    else {
      this.isValidEmail = false;
    }
  }

  checkPassword() {
    this.userDetails = this.regForm.value;
    console.log(this.userDetails);

  }




}
