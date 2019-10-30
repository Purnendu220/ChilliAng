import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../core/service/local-storage.service';
import { Constants } from '../core/constants';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn:boolean;
  phone:any;
  password:any;
  agentPhone:any;
  constructor() { }

  ngOnInit() {
    this.isLoggedIn = LocalStorageService.getIsLoggedIn();
    if(this.isLoggedIn){
      this.agentPhone=LocalStorageService.getUser().phone;

    }
  }
login(){
  if(this.phone&&this.password&&this.phone.length>0 && this.password.length>0){
    if(this.phone=="8181818181"&&this.password=="123456"){
        LocalStorageService.setIsLoggedIn(true);
       LocalStorageService.setUser({name:"Admin",phone:"8181818181",email:"admin@yopmail.com"});
       this.isLoggedIn = LocalStorageService.getIsLoggedIn();

       this.agentPhone=LocalStorageService.getUser().phone;
        $("#loginModal").modal("hide");

    }else{
      alert("Incorrect login details.")
 
    }
  }else{
    alert("Require Fields are missing")

  }


}
signup(){

}
logout(){
  LocalStorageService.setIsLoggedIn(false);
  localStorage.removeItem(Constants.userDataKey);
  this.isLoggedIn = LocalStorageService.getIsLoggedIn();

}

pinmodification(){
  $("#pinModal").modal("hide");
}
dealerBalance(){
  $("#dealerModal").modal("hide");
}
}
