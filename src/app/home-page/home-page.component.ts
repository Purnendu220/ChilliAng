import { Component, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { LocalStorageService } from '../core/service/local-storage.service';
declare var $: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private http: HttpClient){}
    ngAfterViewInit() {
//     $('.hero-slider').slick({
//       autoplay: true,
//       autoplaySpeed: 7500,
//       pauseOnFocus: false,
//       pauseOnHover: false,
//       infinite: true,
//       arrows: true,
//       fade: true,
//       prevArrow: '<button type=\'button\' class=\'prevArrow\'><i class=\'ti-angle-left\'></i></button>',
//       nextArrow: '<button type=\'button\' class=\'nextArrow\'><i class=\'ti-angle-right\'></i></button>',
//       dots: true
//   });
//   $('.hero-slider').slickAnimation();
//   $('[data-background]').each(function () {
//     $(this).css({
//         'background-image': 'url(' + $(this).data('background') + ')'
//     });
// });
 
}

isLoggedIn:any;
@ViewChild('Appheader',{static: false}) header:HeaderComponent;

ngOnInit(){
  this.isLoggedIn = LocalStorageService.getIsLoggedIn();
 
}
userLoggedIn(){
  this.isLoggedIn = LocalStorageService.getIsLoggedIn();
  console.log("Login")

}
userLoggedOut(){
  this.isLoggedIn = LocalStorageService.getIsLoggedIn();
  console.log("Logout")

}

userLoginRequest(){
  this.header.openModal("#loginModal");

}
}
