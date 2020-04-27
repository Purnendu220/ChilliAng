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
  constructor(private router : Router ) { }

  ngOnInit() {
    if(LocalStorageService.isLoggedIn()){
      this.queryUserProfileData = LocalStorageService.getUserData();
    }
    
  }

}
