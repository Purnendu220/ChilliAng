import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './core/service/local-storage.service';
import { HeaderComponent } from './header/header.component';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn:any;

  constructor(private http: HttpClient){

  }

ngOnInit(){
  this.isLoggedIn = LocalStorageService.getIsLoggedIn();
 
}

}
