import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
  }

  isValidPattern = false;
  isValid = false;
  updateSuccessful = false;
  updateFailed = false;

  public updatePass = this.fb.group({

    newPassword: ['', Validators.required],
    newConPassword: ['', Validators.required]

  });



  async updatePassword() {
    const newPass = {
      username: sessionStorage.getItem('user_name'),
      password: this.updatePass.value.newPassword
    };
    // this.newPass = this.updatePass.value;
    const url = "http://localhost:5700/changePassword";
    let res = await this.http.post(url, newPass).toPromise();
    console.log(res);
    if (res != 0) {
      this.updateSuccessful = true;
    }
    else {
      this.updateFailed = true;
    }
  }


  async checkPass() {

    let regex = /^([a-z0-9@_]+){8,12}$/;
    let pass = this.updatePass.value.newPassword;
    let passCon = this.updatePass.value.newConPassword;
    console.log("Pass: " + pass + " ConPass: " + passCon);

    if (regex.test(pass)) {
      console.log("Regex was success");
      this.isValidPattern = false;
      if (pass === passCon) {
        this.isValid = false;
        console.log("Don't watch");
      }
      else {
        this.isValid = true;
      }
    }
    else {
      this.isValidPattern = true;
    }



  }

}
