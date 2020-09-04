import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormControl, FormControlName, FormGroup } from '@angular/forms'
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }


  loginGroup = new FormGroup({

    username: new FormControl(),
    password: new FormControl()

  });

  loginCred = {};

  userLogin() {

    this.loginCred = this.loginGroup.value;

    if (this.validateUser(this.loginCred)) {
      console.log("Routing to Home Page");
    }
    else {
      console.log("Failed");
    }




    // sessionStorage.setItem("sid", "true");
    // this.router.navigate(['home']);
  }


  async validateUser(userDetails) {

    try {
      const url = 'http://localhost:5700/login';
      let res = await this.http.post(url, userDetails).toPromise();
      if (res === "true") {
        sessionStorage.setItem("sid", "true");
        this.router.navigate(['home/mainPage']);
        var nameOfuser = userDetails.username;
        sessionStorage.setItem("user_name", nameOfuser);
      }
      else {
        alert("Invalid Credentials, Try again.");
      }

    }
    catch (err) {
      console.log("Error => " + err);
      alert("An error has occured, try later")
    }



  }


}
