import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from '../core/service/local-storage.service';
import { Constants } from '../core/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';

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
  loginUrl:any = "http://41.222.103.118:3333/dealer/authDealerNumber";
  dealerBalTransfer="http://41.222.103.118:3333/dealer/dealerBalTransfer";
  dealerOpNotify = "http://41.222.103.118:3333/dealer/dealerOpNotify";
  etopUp = "http://41.222.103.118:3333/dealer/eTopup";
  modifyPin = "http://41.222.103.118:3333/dealer/modifydPIN";
  qryLastTransETOPUP = "http://41.222.103.118:3333/dealer/qryLastTransETOPUP";

  amount:any;
  agentPwd:any
  fromAgentNbr:any
  toAgentNbr:any
  oldMpin:any;
  newMPin:any;
  confirmNewMPin:any;
  msisdn:any;
  amountetopup:any;
  agentPwdEtopup:any;
   @Output() mUserLoggedIn = new EventEmitter();
   @Output() mUserLoggedOut = new EventEmitter(); 
 
   agentPwdLastTransaction:any;
   lastTransactionObj:any;
 
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.isLoggedIn = LocalStorageService.getIsLoggedIn();
    if(this.isLoggedIn){
      this.agentPhone=LocalStorageService.getUser().phone;
      this.fromAgentNbr=LocalStorageService.getUser().phone;

    }
  }
login(){
  if(this.phone&&this.password&&this.phone.length>0 && this.password.length>0){
   this.loginApi(this.phone,this.password);
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
  this.mUserLoggedOut.emit();


}

loginApi(agentNumber,mPin){
  const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  let params="?agentNbr="+agentNumber+"&mPin="+mPin;
  this.http.get(this.loginUrl+params, { headers: headers})
    .subscribe(data => {
      let reaponse:any=data;
      if(JSON.parse(reaponse.data).resultCode!="0000"){
       alert(JSON.parse(reaponse.data).resultMsg)
       return;
      }
      else{
        LocalStorageService.setIsLoggedIn(true);
        LocalStorageService.setUser({name:agentNumber,phone:agentNumber,email:agentNumber+"@yopmail.com"});
        this.isLoggedIn = LocalStorageService.getIsLoggedIn();
        this.agentPhone=LocalStorageService.getUser().phone;
        this.fromAgentNbr=LocalStorageService.getUser().phone;
        this.mUserLoggedIn.emit({name:agentNumber,phone:agentNumber,email:agentNumber+"@yopmail.com"});
        $("#loginModal").modal("hide");
      }
      console.log(JSON.parse(reaponse.data));
    },
    error => {
      alert(error.data)
      console.log( JSON.parse(error.data));

    });


  //return this.http.get(this.loginUrl);
}

dealerBalanceTransfer(){
  if(this.agentPwd&&this.agentPwd+"".length>0&&this.amount&&this.amount+"".length>0&&this.toAgentNbr&&this.toAgentNbr+"".length>0){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    let params = "?agentPwd="+this.agentPwd+"&amount="+this.amount+"&fromAgentNbr="+this.fromAgentNbr+"&operChannelId=12"+"&toAgentNbr="+this.toAgentNbr;
    this.http.get(this.dealerBalTransfer+params, { headers: headers})
      .subscribe(data => {
        let reaponse:any=data;
        this.agentPwd="";
       if(reaponse.data=="0000"){
        alert("Dear Customer, The transaction is successful.")

         // alert("Balance transfer to dealer "+this.toAgentNbr+" is successfull.")
          this.toAgentNbr = "";
          this.amount = "";
         $("#dealerModal").modal("hide");
        }else{
          alert(JSON.parse(reaponse.data).resultMsg)
          return;
        }

  
        console.log(JSON.parse(reaponse.data));
      },
      error => {
        alert(error.data)
        console.log( JSON.parse(error.data));
  
      });
  }
  else{
    alert("Pleasee fill all required Feilds");
  }


}

register(){
 // return this.http.post(localUrl,{});
}

pinmodification(){
  if(this.oldMpin&&this.oldMpin+"".length>0&&this.newMPin&&this.newMPin+"".length>0&&this.confirmNewMPin&&this.confirmNewMPin+"".length>0){
    if(this.newMPin==this.confirmNewMPin){
      const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
      let params = "?newPin="+this.newMPin+"&agentNbr="+this.agentPhone+"&oldPin="+this.oldMpin;
      this.http.get(this.modifyPin+params, { headers: headers})
        .subscribe(data => {
          debugger
          let reaponse:any=data;
          if(reaponse.data != "success"){
           alert(reaponse.data)
           return;
          }
          else{
            this.oldMpin = "";
            this.newMPin = "";
            this.confirmNewMPin = "";
           $("#dealerModal").modal("hide");
           alert("Congrats! Pin modified successfully.")

          }
    
          console.log(JSON.parse(reaponse.data));
        },
        error => {
          alert(error.data)
          console.log( JSON.parse(error.data));
    
        });
    }else{
      alert("Pleasee new mpin and confirm mpin must be same");

    }

  }
  else{
    alert("Pleasee fill all required Feilds");
  }
  
  $("#pinModal").modal("hide");
}
eTopUpUser(){
  debugger
  if(this.msisdn&&this.msisdn+"".length>0&&this.amountetopup&&this.amountetopup+"".length>0&&this.agentPwdEtopup&&this.agentPwdEtopup+"".length>0){
    if(this.msisdn.toString().indexOf("230")!=0){
      this.msisdn = "230"+this.msisdn;
    }
      const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
      let params = "?msisdn="+this.msisdn+"&agentNbr="+this.agentPhone+"&amount="+this.amountetopup+"&operChannelId=12&agentPwd="+this.agentPwdEtopup;
      this.http.get(this.etopUp+params, { headers: headers})
        .subscribe(data => {
          let reaponse:any=data;
         if(reaponse.data=="0000"){
           alert("Dear Customer, The transaction is successful.")
            //alert("E Topup  to msisdn "+this.msisdn+" is successfull.")
            this.msisdn = "";
            this.amountetopup = "";
           $("#etopupModal").modal("hide");
          }else{
            alert(JSON.parse(reaponse.data).resultMsg)
            return;
          }
    
          console.log(JSON.parse(reaponse.data));
        },
        error => {
          alert(error.data)
          console.log( JSON.parse(error.data));
    
        });
}
  else{
    alert("Pleasee fill all required Feilds");
  }
  
  $("#etopupModal").modal("hide");
}


getLastTransaction(){
     if(this.agentPwdLastTransaction&&this.agentPwdLastTransaction+"".length>0){
      const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
      let params = "?agentNbr="+this.agentPhone+"&agentPwd="+this.agentPwdLastTransaction;
      this.http.get(this.qryLastTransETOPUP+params, { headers: headers})
        .subscribe(data => {
          let reaponse:any=data;
          let responseData:any;
          try{
             responseData=JSON.parse(reaponse.data);
            }
          catch(e){
            responseData=reaponse.data;
          }
          if(responseData&&responseData.errorcode&&responseData.errorcode!="0000"){
          alert(responseData.errormsg)
          }
          else{
            this.lastTransactionObj = responseData;
            this.closeModal("#lastTransactionModal");
            this.openModal("#lastTransactionDetailModal");

          }
      
        },
        error => {
          alert(error.data)
    
        });
     }else{
       alert("Agent password is required");
     }

}
openModal(id){
  $(id).modal("show");
 
}
closeModal(id){
  $(id).modal("hide");
}
}
