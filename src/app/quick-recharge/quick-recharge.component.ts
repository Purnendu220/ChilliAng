import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../core/service/local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-quick-recharge',
  templateUrl: './quick-recharge.component.html',
  styleUrls: ['./quick-recharge.component.css']
})
export class QuickRechargeComponent implements OnInit {
  rechargeType = -1;
  msisdn:any;
  vouchercode:any;
  isLoggedIn:any;
  agentPhone:any;
  userType:any;
  userData:any;
  servicenumber:any;
  amount:any;
  headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

  apiServiceNumberRecharge = "http://41.222.103.118:3333/subscriber/recharge?serviceNumber=xx-xx&amount=aa-aa"
  apiVoucherCodeRecharge = "http://41.222.103.118:3333/vc/cardRecharge2/";

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.isLoggedIn = LocalStorageService.getIsLoggedIn();
    if(this.isLoggedIn){
      this.agentPhone=LocalStorageService.getUser().phone;
      this.userType = LocalStorageService.getUserTypeString();
      if(this.userType==2){
        this.userData = LocalStorageService.getUserData();
      }

    }
  }
private eTopUpUser(){
  if(this.rechargeType==1){
    this.callVoucherApi(this.msisdn,this.vouchercode);
   }if(this.rechargeType==2){
     this.callServiceApi(this.servicenumber,this.amount);
  }
}
  private callVoucherApi(msisdn,voucherCode) {
    debugger
    if(msisdn&&(msisdn+"").length>0&&voucherCode&&(voucherCode+"").length>0){
      let url = this.apiVoucherCodeRecharge+msisdn+"/"+this.agentPhone+"/"+voucherCode;

      http://41.222.103.118:3333/vc/cardRecharge2/{msisdn}/{callingNbr}/{voucherCode}
      this.http.get(url, { headers: this.headers})
      .subscribe(data => {
        let reaponse:any=data;
        try{
      let msg = this.getVoucherCodeResult(msisdn,JSON.stringify(reaponse.data));
      alert(msg);
        }catch(e){
          alert("Dear Customer, Sorry! Your recharge attempt failed, Please try afer some time.");

        }
       

      },
      error => {
        alert(JSON.stringify(error.data))
        console.log( JSON.stringify(error.data));
  
      });
    }else{
      alert("please fill all required feild");
    }


  }
  private callServiceApi(servicenumber,amount) {
    if(servicenumber&&(servicenumber+"").length>0&&amount&&(amount+"").length>0){
      let urlOne = this.apiServiceNumberRecharge.replace("xx-xx", servicenumber);
      let url = urlOne.replace("aa-aa", amount);
      this.http.get(url, { headers: this.headers})
      .subscribe(data => {
        let reaponse:any=data;
       console.log(JSON.stringify(reaponse.data));
       alert(JSON.stringify(reaponse.data))

      },
      error => {
        alert(JSON.stringify(error.data))
        console.log( JSON.stringify(error.data));
  
      });
  
    }else{
      alert("please fill all required feild");
    }


  }

  getVoucherCodeResult(msisdn,responseStr){
       if(responseStr.indexOf("<ax21:resultCode>0<")>-1|| responseStr.indexOf("<ax21:resultDesc>Success")>-1) {
         return "Dear Customer, Your recharge is successful.";
       }else if(responseStr.indexOf("<ax21:resultCode>1<")>-1 || responseStr.indexOf("Username or password is incorrect")>-1) {
         return "Dear Customer, Sorry! Your recharge attempt failed because Username or password is incorrect.Thank you.";
       }else if(responseStr.indexOf("<ax21:resultCode>2<")>-1 ) {
         return "Dear Customer, Sorry! Your recharge attempt failed because of Re-login error. Thank you.";
       }else if(responseStr.indexOf("<ax21:resultCode>3<")>-1 ) {
         return "Dear Customer, Sorry! Your recharge attempt failed because user does not exist.";
       }else if(responseStr.indexOf("<ax21:resultCode>8<")>-1 ) {
         return "Dear Customer, Sorry! Your recharge attempt failed because User top-up has exceeded the maximum value of account and not allow to recharge.";
       }else if(responseStr.indexOf("<ax21:resultCode>9<")>-1 ) {
         return "Dear Customer, Sorry! Your recharge attempt failed because Database is busy, not allow to recharge.";
       }else if(responseStr.indexOf("<ax21:resultCode>10<")>-1 ) {
         return "Dear Customer, Sorry! Your recharge attempt failed because System is busy.";
       }else if(responseStr.indexOf("<ax21:resultCode>11<")>-1 ) {
         return "Dear Customer, Sorry! Your recharge attempt failed because of Message encoding error.";
       }else if(responseStr.indexOf("<ax21:resultCode>12<")>-1 ) {
         this.UpdateCRM_WrongVC_Pin(msisdn,this.agentPhone);
         return "Dear Customer, Sorry! Your recharge attempt failed because VC Pin is wrong.";
       }else if(responseStr.indexOf("<ax21:resultCode>13<")>-1 ) {
         return "Dear Customer, Sorry! Your recharge attempt failed because VC is expired";
       }else if(responseStr.indexOf("<ax21:resultCode>14<")>-1 ) {
         return "Dear Customer, Sorry! Your recharge attempt failed because VC is used.";
       }else if(responseStr.indexOf("<ax21:resultCode>15<")>-1 ) {
         return "Dear Customer, Sorry! Your recharge attempt failed because VC does not exist.";
       }else if(responseStr.indexOf("<ax21:resultCode>16<")>-1 ) {
         return "Dear Customer, Sorry! Your recharge attempt failed because Server party does not support the protocol version.";
       }else if(responseStr.indexOf("<ax21:resultCode>17<")>-1 ) {
         return "Dear Customer, Sorry! Your recharge attempt failed because VC is locked.";
       }else if(responseStr.indexOf("<ax21:resultCode>18<")>-1 ) {
         return "Dear Customer, Sorry! Your recharge attempt failed because Subscriber is locked, not allow to recharge.";
       }else if(responseStr.indexOf("<ax21:resultCode>19<")>-1 ) {
         return "Dear Customer, Sorry! Your recharge attempt failed because VC is frozen.";
       }else if(responseStr.indexOf("<ax21:resultCode>20<")>-1 ) {
         return "Dear Customer, Sorry! Your recharge attempt failed because VC is unavailable, not allow to recharge.";
       }else if(responseStr.indexOf("<ax21:resultCode>21<")>-1 ) {
         return "Dear Customer, Sorry! Your recharge attempt failed because User is locked, not allow to recharge.";
       }else if(responseStr.indexOf("<ax21:resultCode>22<")>-1 ) {
         return "Dear Customer, Sorry! Your recharge attempt failed because User is halted, not allow to recharge.";
       }else if(responseStr.indexOf("<ax21:resultCode>23<")>-1 ) {
         return "Dear Customer, Sorry! Your recharge attempt failed because User is in black list, not allow to recharge.";
       }else if(responseStr.indexOf("<ax21:resultCode>24<")>-1 ) {
         return "Dear Customer, Sorry! Your recharge attempt failed because User is frozen, not allow to recharge.";
       }else if(responseStr.indexOf("<ax21:resultCode>25<")>-1 ) {
         return "Dear Customer, Sorry! Your recharge attempt failed because Failed to set card status (set card status to used).";
       }else if(responseStr.indexOf("<ax21:resultCode>26<")>-1 ) {
         return "Dear Customer, Sorry! Your recharge attempt failed because cannot use this VC.";
       }else if(responseStr.indexOf("<ax21:resultCode>27<")>-1 ) {
         return "Dear Customer, Sorry! Your recharge attempt failed because Channel does not exist.";
       }else if(responseStr.indexOf("<ax21:resultCode>28<")>-1 ) {
         return "Dear Customer, Sorry! Your recharge attempt failed because Current subscriber status does not allow to recharge.";
       }else if(responseStr.indexOf("<ax21:resultCode>29<")>-1 ) {
         return "Dear Customer, Sorry! Your recharge attempt failed because Account system failed to recharge.";
       }else if(responseStr.indexOf("<ax21:resultCode>30<")>-1) {
         return "Dear Customer, Sorry! Your recharge attempt failed because Transaction session ID is repeated";
       }else {
         return "Dear Customer, Sorry! Your recharge attempt failed, Please try afer some time.";
       }

  }
  UpdateCRM_WrongVC_Pin(msisdn: any, callingNumber: any) {
    let url = "http://172.27.89.209:4545/insmp/api/subscriber/updateCRM/"+msisdn;
     this.http.get(url, { headers: this.headers})
    .subscribe(data => {
      let reaponse:any=data;
     },
    error => {
      console.log( JSON.stringify(error.data));

    });  }

    userLoggedIn(){
      this.isLoggedIn = LocalStorageService.getIsLoggedIn();
      console.log("Login")
    
    }
    userLoggedOut(){
      this.isLoggedIn = LocalStorageService.getIsLoggedIn();
      console.log("Logout")
    
    }

}
