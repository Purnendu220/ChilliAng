import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../core/service/local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error: {};
  loginError: string;
  userType:any;

  loginUrlSubscriber ="http://41.222.103.118:3333/subscriber/queryUserProfileMTML2"

  loginUrl:any = "http://41.222.103.118:3333/dealer/authDealerNumber";
  dealerBalTransfer="http://41.222.103.118:3333/dealer/dealerBalTransfer";
  dealerOpNotify = "http://41.222.103.118:3333/dealer/dealerOpNotify";
  etopUp = "http://41.222.103.118:3333/dealer/eTopup";
  modifyPin = "http://41.222.103.118:3333/dealer/modifydPIN";
  qryLastTransETOPUP = "http://41.222.103.118:3333/dealer/qryLastTransETOPUP";
  uploadPics= "http://41.222.103.118:3333/dealer/uploads";
  queryUserProfile ="http://41.222.103.118:3333/subscriber/queryUserProfileMTML2"
  registerCustomer ="http://41.222.103.118:3333/dealer/customerRegisterBORequest"
  queryIndividualPackageUrl ="http://41.222.103.118:3333/subscriber/queryIndividualPackage";


    getOtPtApi="http://41.222.103.118:3333/otp/setMpin/"

// above api will try to set {mpin} for {msisdn}. if msisdn found in system and its isActive field in db is true, then it will 
// simply set/update mpin for that msisdn. Else it will insert/update otp by sending OTP to that msisdn.

    verifyOtpApi = "http://41.222.103.118:3333/otp/verifyOtp/"

// above api will verify the {otp} send to {msisdn}. if it was correct and within 5 minutes interval, then it will set isActive field 
// in db to true.


 verifyMPinApi = "http://41.222.103.118:3333/otp/verifyMpin/"

// above api will verify {msisdn-mpin} combination in db and return appropriate, success or incorrect mpin msg.
 
isUserActive = "http://41.222.103.118:3333/otp/checkStatus/"

  constructor(

    private fb: FormBuilder,
    private router: Router,private http: HttpClient,
    //private authService: AuthService

  ) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      customerType: ['', Validators.required]
    });

   // this.authService.logout();

  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {

    this.submitted = true;
    if (!this.loginForm.valid) {
      return false;
    } else {
      this.userType = this.loginForm.get('customerType');
      if(this.userType == 1){
        this.loginApi(this.loginForm.get('username'),this.loginForm.get('password'));
      }else{
        this.loginApiSubscriber(this.loginForm.get('username'),this.loginForm.get('password'));
      }    
    }

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
          LocalStorageService.setUser({name:agentNumber,phone:agentNumber,email:agentNumber+"@yopmail.com",userType:this.userType});
          LocalStorageService.setUserType(this.userType)
          this.router.navigate(['/'])
          
        }
        console.log(JSON.parse(reaponse.data));
      },
      error => {
        alert(error.data)
        console.log( JSON.parse(error.data));
  
      });
  
  
    //return this.http.get(this.loginUrl);
  }
  loginApiSubscriber(agentNumber,mPin){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    let params="?msisdn="+agentNumber+"&userPwd="+mPin+"&imsi=";
    this.http.get(this.loginUrlSubscriber+params, { headers: headers})
      .subscribe(data => {
        debugger
        let reaponse:any=data;
        let errorMessage;
        try{
          errorMessage = JSON.parse(reaponse.data).errormsg;
        }catch(e){
  }
        if(errorMessage&&errorMessage.length>0){
         alert(errorMessage)
         return;
        }
        else{
          LocalStorageService.setIsLoggedIn(true);
          LocalStorageService.setUser({name:agentNumber,phone:agentNumber,email:agentNumber+"@yopmail.com",userType:this.userType});
          LocalStorageService.setUserType(this.userType)
          LocalStorageService.setUserData(reaponse.data)
          this.router.navigate(['/'])

        }
        console.log(JSON.parse(reaponse.data));
      },
      error => {
        debugger
  
        alert(error.data)
        console.log( JSON.parse(error.data));
  
      });
  
  
    //return this.http.get(this.loginUrl);
  }

}
