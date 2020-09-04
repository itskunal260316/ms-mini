import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ShareUserDataService } from '../shareUserData/share-user-data.service'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { CommentStmt } from '@angular/compiler';
import { faBars, faLandmark } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-logged-in-nav',
  templateUrl: './logged-in-nav.component.html',
  styleUrls: ['./logged-in-nav.component.css']
})
export class LoggedInNavComponent implements OnInit {

  constructor(private router: Router, private sharedData: ShareUserDataService, private http: HttpClient) { }

  ngOnInit(): void {

  }
  faBars = faBars;
  faLandmark = faLandmark;
  userName = sessionStorage.getItem('user_name');
  public signOutModal = true;


  signOutModalFunction() {
    this.signOutModal = true;
  }

  signOut() {
    this.signOutModalFunction();
    sessionStorage.removeItem('sid');
    this.router.navigate(['login']);
  }

  async editProfile() {
    let username = { username: sessionStorage.getItem('user_name') };
    const url = 'http://localhost:5700/getAllData';
    var result = await this.http.post(url, username).toPromise();
    this.sharedData.sendData(result[0]);
  }

  async delProfile() {
    let username = { username: sessionStorage.getItem('user_name') };
    const url = 'http://localhost:5700/delData';
    var result = await this.http.post(url, username).toPromise();
    if (result == "deleted") {
      sessionStorage.clear();
      alert("User was deleted");
      this.signOut();
    }
    else {
      alert("An error has occured");
    }
  }


}
