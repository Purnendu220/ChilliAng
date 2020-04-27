import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../core/service/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css']
})
export class CustomerPageComponent implements OnInit {
  queryUserProfileData:any;
  isLoggedIn:boolean;
  phone:any;
  password:any;
  agentPhone:any;
  userType:any = -1;//for dealer 1 for subscriber 2
  userData:any;


  constructor(private router : Router ) { }

  ngOnInit() {
    if(LocalStorageService.isLoggedIn()){
      this.queryUserProfileData = LocalStorageService.getUserData();
    }
    this.isLoggedIn = LocalStorageService.getIsLoggedIn();
    if(this.isLoggedIn){
      this.agentPhone=LocalStorageService.getUser().phone;
      this.userType = LocalStorageService.getUserTypeString();
      if(this.userType==2){
        this.userData = LocalStorageService.getUserData();
      }

    }
    
  }
  userLoggedIn(){
    this.isLoggedIn = LocalStorageService.getIsLoggedIn();
    console.log("Login")
  
  }
  userLoggedOut(){
    this.isLoggedIn = LocalStorageService.getIsLoggedIn();
    console.log("Logout")
  
  }
}
