import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../core/service/local-storage.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  isLoggedIn:boolean;
  userLoggedIn(){
    this.isLoggedIn = LocalStorageService.getIsLoggedIn();
    console.log("Login")
  
  }
  userLoggedOut(){
    this.isLoggedIn = LocalStorageService.getIsLoggedIn();
    console.log("Logout")
  
  }
}
