import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormControl, FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  isMessageSent = false;
  public isContactEmailValid = false;
  public isContactPhone = false;

  public contactMsg = this.fb.group({

    name: [''],
    email: ['', Validators.required],
    phone: [''],
    msg: ['', Validators.required]

  });

  userMsg = {};

  async saveMsg() {
    this.userMsg = this.contactMsg.value;
    console.log(this.userMsg);
    const url = 'http://localhost:5700/saveMsg';
    let res = await this.http.post(url, this.userMsg).toPromise();

    if (res != 0) {
      this.isMessageSent = true;
    }
    else {
      this.isMessageSent = false;
    }

    this.contactMsg.setValue({

      name: [''],
      email: [''],
      phone: [''],
      msg: ['']

    });

  }




  validateContactEmail() {

    this.userMsg = this.contactMsg.value;
    let userEmail = this.contactMsg.value.email;
    let regex = /^([a-zA_Z0-9\.@_]+)@([a-zA_Z0-9\.-_]{2,20}).([a-z]{2,3})(\.[a-z]{2,10})$/
    if (regex.test(userEmail)) {
      console.log(userEmail);
      this.isContactEmailValid = false;
    }
    else {
      this.isContactEmailValid = true;
    }


  }





}
