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
  agentPhone:any="23059511002";
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

  userType:any = -1;//for dealer 1 for subscriber 2
  userData:any;
  
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

   signupmsisdn:any;
   signupName:any;
   signupCertNo:any;
   signupGender:any;
   signupAddressLine1:any;
   signupAddressLine2:any;
   signupPic:any;

   queryUserProfileMsisdn:any;
   queryUserProfileIMSI:any;
   queryUserProfilePswd:any;
   queryUserProfileData:any;

 
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.isLoggedIn = LocalStorageService.getIsLoggedIn();
    if(this.isLoggedIn){
      this.agentPhone=LocalStorageService.getUser().phone;
      this.fromAgentNbr=LocalStorageService.getUser().phone;
      this.userType = LocalStorageService.getUserTypeString();
      if(this.userType==2){
        this.userData = LocalStorageService.getUserData();
      }

    }

  }
  selectUserType(type){
    this.userType = type;
  }
login(){
  
  if(this.userType>-1&&this.phone&&this.password&&this.phone.length>0 && this.password.length>0){
    if(this.userType == 1){
      this.loginApi(this.phone,this.password);
    }else{
      this.loginApiSubscriber(this.phone,this.password);
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
        LocalStorageService.setUser({name:agentNumber,phone:agentNumber,email:agentNumber+"@yopmail.com",userType:this.userType});
        LocalStorageService.setUserType(this.userType)
        this.isLoggedIn = LocalStorageService.getIsLoggedIn();
        this.agentPhone=LocalStorageService.getUser().phone;
        this.fromAgentNbr=LocalStorageService.getUser().phone;
        this.mUserLoggedIn.emit({name:agentNumber,phone:agentNumber,email:agentNumber+"@yopmail.com",userType:this.userType});
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
        this.isLoggedIn = LocalStorageService.getIsLoggedIn();
        this.agentPhone=LocalStorageService.getUser().phone;
        this.fromAgentNbr=LocalStorageService.getUser().phone;
        this.mUserLoggedIn.emit({name:agentNumber,phone:agentNumber,email:agentNumber+"@yopmail.com",userType:this.userType});
        this.userData = reaponse.data;
        $("#loginModal").modal("hide");
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

queryUserProfileMTML2(){
  if(this.queryUserProfileMsisdn&&this.queryUserProfileMsisdn+"".length>0){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    let params;
    if(!this.queryUserProfileIMSI||this.queryUserProfileIMSI+"".length==0){
      this.queryUserProfileIMSI="";

    }
    if(!this.queryUserProfilePswd||this.queryUserProfilePswd+"".length==0){
      this.queryUserProfilePswd="";

    }

  params = "?msisdn="+this.queryUserProfileMsisdn+"&imsi="+this.queryUserProfileIMSI+"&userPwd="+this.queryUserProfilePswd;

    this.http.get(this.queryUserProfile+params, { headers: headers})
      .subscribe(data => {
        let reaponse:any=data;
        console.log(JSON.parse(reaponse.data));
        let dataresponse = JSON.parse(reaponse.data);
        if(dataresponse.errormsg){
          alert(dataresponse.errormsg)
        }else{
         this.queryUserProfileData =  dataresponse;
         this.closeModal("#queryUserProfileMTML2Modal");
            this.openModal("#queryUserProfileMTML2ModalResponse");
         
        }
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
   if(this.signupmsisdn&&this.signupmsisdn.length>0&&
    this.signupName&&this.signupName.length>0&&
    this.signupCertNo&&this.signupCertNo.length>0&&
    this.signupGender&&this.signupGender.length>0&&
    this.signupAddressLine1&&this.signupAddressLine1.length>0&&
    this.signupAddressLine2&&this.signupAddressLine2.length>0&&
    this.signupPic&&this.signupPic.length>0
    )
{
  const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  let request ={'msisdn':this.signupmsisdn,
    'agentNbr':LocalStorageService.getUser().phone,
    'customerName': this.signupName,
    'certType':"1",
    'certNo': this.signupCertNo,
    'gender': this.signupGender,
    'location':'Mauritius MTML',
    'addressLine1':this.signupAddressLine1,
    'addressLine2':this.signupAddressLine2,
    'customerImagePath':this.signupPic,
    'idPic':this.signupPic
  }
  return this.http.post(this.registerCustomer, request,{ headers: headers})
  .subscribe(data => {
    let reaponse:any=data;
    console.log(JSON.parse(reaponse.data));
    let dataresponse=JSON.parse(reaponse.data);
    if(dataresponse.errormsg){
      alert(dataresponse.errormsg);
     } else{
       alert("Registration successfull")
     }
  },
  error => {
    alert(error.data)
    console.log( JSON.parse(error.data));

  });


}else{
  alert('Please complete form before submit.')
}
 // return this.http.post(localUrl,{});
}
fileSelected(event){
  //const headers = new HttpHeaders({'Content-Type': 'multipart/form-data'});
if(this.signupmsisdn&&this.signupmsisdn+"".length>0){
  let formData: FormData = new FormData(); 
  formData.append('msisdn', this.signupmsisdn); 
  formData.append('files', event[0]); 
  formData.append('files', event[0]); 

  return this.http.post(this.uploadPics, formData)
  .subscribe(data => {
    debugger
    let reaponse:any=data;
    this.signupPic = reaponse.pic1
    alert("success")
  },
  error => {
    alert(error.data)
    console.log( JSON.parse(error.data));

  });
}else{
  alert("Please provoide msisdn before selecting image.")
}


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
handleError(handleError: any) {
  throw new Error("Method not implemented.");
}
queryIndividualPackage(msisdn){

  const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  headers.append('Access-Control-Allow-Origin', '*');
  
      this.http.get(this.queryIndividualPackageUrl+"?msisdn="+this.agentPhone, { headers: headers})
        .subscribe(data => {
          debugger
          let reaponse:any=data;
          let responseData:any;
          try{
             responseData=this.getIndividualResponse(reaponse);
            
            }
          catch(e){
            responseData=reaponse.data;
          }
         alert(responseData);
      
        },
        error => {
          debugger
          alert(error.data)
    
        });
}

getIndividualResponse(responseStr){
  try{

  if(responseStr!=null && responseStr.indexOf("SUCCESS")>0 || responseStr.indexOf("RETN=0000")>0) {
    let resultStr = responseStr.substring(responseStr.indexOf("RESULT="), responseStr.length());
    responseStr = resultStr.substring(resultStr.indexOf("RESULT=")+7, resultStr.indexOf("\""));
    let plans = responseStr.split("&&");
    //SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
    let Fn_EffDate_Str = "";
    for (let i = 0; i < plans.length; i++) {
      let str = plans[i];
      let items = str.split("\\|");
      let plan_name = "";
      let exp_date = "";
         if(items.length>=3 && items[3]!=null && items[3].length()>1)
           plan_name = items[3];
         if(items.length>=5 && items[5]!=null && items[5].length()>1)
           exp_date= items[5];
         let position = i+1;
         if(exp_date!=null)
          // exp_date = formatDatewithoutTime2(exp_date);
         Fn_EffDate_Str = Fn_EffDate_Str+""+plan_name+" expires on "+exp_date+", ";
    }
    
    let is_areStr = "are";
    if(plans.length == 1)
    {
      is_areStr= "is";
    }
    
    if(Fn_EffDate_Str!=null)
      Fn_EffDate_Str=Fn_EffDate_Str.trim();
    if(Fn_EffDate_Str.endsWith(",")) {
      Fn_EffDate_Str = Fn_EffDate_Str.substring(0,Fn_EffDate_Str.lastIndexOf(","));
    }
    
    
    if(is_areStr=="are")
      responseStr= "Your existing packages "+is_areStr+" "+Fn_EffDate_Str+".";
    else
      responseStr= "Your existing packages "+is_areStr+" "+Fn_EffDate_Str+".";
    
    
    if(responseStr!=null && responseStr.length()>159)
    responseStr= Fn_EffDate_Str+".";
      
    
  } else  {
    responseStr = "Dear Customer, Sorry! your existing package deatils are not available.Thank you.";
  }
}
catch (e) {
  // TODO: handle exception
  responseStr = "Dear Customer, Sorry! your existing package deatils are not available.Thank you.";
}
return responseStr;

}


}  

