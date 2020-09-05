import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { flatten } from '@angular/compiler';
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';


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
  public isValidEmailPattern = false;
  public isValidPassPattern = false;

  public regForm = this.fb.group({

    fname: ['', Validators.required],
    lname: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    userpass: ['', Validators.required],
    userphone: ['', Validators.required],
    conPass: ['', Validators.required]

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
    let userEmail = this.regForm.value.email;
    let regex = /^([a-zA_Z0-9\.@_]+)@([a-zA_Z0-9\.-_]{2,20}).([a-z]{2,3})(\.[a-z]{2,10})$/
    if (regex.test(userEmail)) {
      this.isValidEmailPattern = false;
      const url = 'http://localhost:5700/usernameEmail';
      let res = await this.http.post(url, this.userDetails).toPromise();
      if (res != 0) {
        this.isValidEmail = true;

      }
      else {
        this.isValidEmail = false;
      }

    }
    else {
      this.isValidEmailPattern = true;
    }

  }


  checkPassword() {
    this.userDetails = this.regForm.value;
    let userPass = this.regForm.value.userpass;
    let regex = /^([a-z0-9@_]+)$/;
    if (regex.test(userPass)) {
      this.isValidPassPattern = false;
      if (this.regForm.value.conPass === this.regForm.value.userpass) {
        this.isPasswordSame = false;
      }
      else {
        this.isPasswordSame = true;
      }
    }
    else {
      this.isValidPassPattern = true;
    }
  }






}

