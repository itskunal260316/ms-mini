import { Component, OnInit } from '@angular/core';
import { ShareUserDataService } from '../shareUserData/share-user-data.service'
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { CommentStmt } from '@angular/compiler';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl, FormControlName } from '@angular/forms';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private sharedData: ShareUserDataService, private http: HttpClient, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {


  }

  public userUpdated = false;
  public editForm = this.fb.group({

    fname: ['', Validators.required],
    lname: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    id: []

  });


  loadData() {
    let userData = this.sharedData.receiveData();
    let vals = Object.values(userData);
    console.log(vals);

    this.editForm.setValue({
      fname: vals[0],
      lname: vals[1],
      username: vals[2],
      email: vals[3],
      phone: vals[4],
      id: vals[5]
    });


  }

  async editData() {
    const updateDetails = this.editForm.value;
    const url = "http://localhost:5700/updateUser";
    console.log(updateDetails);
    let resp = await this.http.post(url, updateDetails).toPromise();
    if (resp === "updated") {
      this.userUpdated = true;
    }
    else {
      this.userUpdated = false;
    }
  }
}