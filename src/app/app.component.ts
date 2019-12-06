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
  @ViewChild('Appheader',{static: false}) header:HeaderComponent;

  constructor(private http: HttpClient){

  }
  ngAfterViewInit() {
    $('.hero-slider').slick({
      autoplay: true,
      autoplaySpeed: 7500,
      pauseOnFocus: false,
      pauseOnHover: false,
      infinite: true,
      arrows: true,
      fade: true,
      prevArrow: '<button type=\'button\' class=\'prevArrow\'><i class=\'ti-angle-left\'></i></button>',
      nextArrow: '<button type=\'button\' class=\'nextArrow\'><i class=\'ti-angle-right\'></i></button>',
      dots: true
  });
  $('.hero-slider').slickAnimation();
  $('[data-background]').each(function () {
    $(this).css({
        'background-image': 'url(' + $(this).data('background') + ')'
    });
});
 
}
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
  title = 'chiliApp';
}
