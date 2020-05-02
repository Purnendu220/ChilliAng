import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../core/service/local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  isLoggedIn:any;
  agentPhone:any;
  userType:any;
  userData:any;
  getCorePackagesApi = "http://41.222.103.118:3333/package/corePackageAll"
  headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

  allPackageType =[];
  addIndividualPackage = "http://41.222.103.118:3333/subscriber/addIndividualPackage";



  constructor(private http: HttpClient) {

   }

  ngOnInit() {
    this.isLoggedIn = LocalStorageService.getIsLoggedIn();
    if(this.isLoggedIn){
      this.agentPhone=LocalStorageService.getUser().phone;
      this.userType = LocalStorageService.getUserTypeString();
      if(this.userType==2){
        this.userData = LocalStorageService.getUserData();
      }

    }
    this.corePackagesApi();

  }

  private corePackagesApi(){
    this.http.get(this.getCorePackagesApi, { headers: this.headers})
    .subscribe(data => {
      let reaponse:any=data;
     console.log(JSON.stringify(reaponse.data));
     this.getAllPackageType(reaponse.data);
    },
    error => {
      alert(JSON.stringify(error.data))
      console.log( JSON.stringify(error.data));

    });
  }

  private getAllPackageType(data)
  {
    let packageTypeIds = [];
    data.forEach(element => {
      if(packageTypeIds.indexOf(element.packageSubType.packageType.id)==-1){
        let obj = {"id":element.packageSubType.packageType.id,"name":element.packageSubType.packageType.name,"packList":[]};
         packageTypeIds.push(element.packageSubType.packageType.id);
         this.allPackageType.push(obj);
      }
      
    });
    setTimeout(() => {
      this.initCollapsable();
   
    }, 1000);
    this.openDiv(data);

  }
  public openDiv(data){
    this.allPackageType.forEach(elementPack => {
      data.forEach(element => {
        if(elementPack.id==element.packageSubType.packageType.id){
          let obj = {"packageSubType":element.packageSubType,"name":element.name,"id":element.id}
           elementPack.packList.push(obj);
        }
        
      });
    });
    console.log(JSON.stringify(this.allPackageType));

  }

  private initCollapsable(){
    var coll = document.getElementsByClassName("collapsible");
    var i;
    for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
  }
}
public addindividualPack(data){
  this.headers.append('Access-Control-Allow-Origin', '*');

  if(this.isLoggedIn&&this.userType==2){
    //let obj =  {"msisdn":"23059511002","priceNum":data.id}
    this.http.get(this.addIndividualPackage+"?msisdn="+"23059511002"+"&priceNum="+data.id,{ headers: this.headers})
      .subscribe(data => {
        debugger
        let reaponse:any=data;
        let result;
        try{
          result= this.getResponseString(reaponse);
          console.log(result);
        }catch(e){
          result="Service is not available, Please try again later.";
        }
        alert(result);
      },
      error => {
        alert(JSON.stringify(error.data))
        console.log( JSON.stringify(error.data));
  
      });
  }else{
    alert("Please login as subscriber to buy")
    }

 
}

getResponseString(responseStr){
  try {
    if(responseStr!=null && (responseStr.indexOf("SUCCESS")>0  || responseStr.indexOf("RETN=0000")>0  || responseStr.indexOf("RETN=0")>0 ) ) {
      responseStr = "Dear Customer, You have successfully subscribed for the  Pack. Thank you.";
      
    }else if(responseStr!=null && responseStr.indexOf("RETN=1001")>0  ) {
      responseStr = "The balance is not enough";
    }else if(responseStr!=null && responseStr.indexOf("RETN=1003")>0  ) {
      responseStr = "Input individual price plan doesn’t exist or The state is incorrect";
    }else if(responseStr!=null && responseStr.indexOf("RETN=1004")>0  ) {
      responseStr = "Input individual price plan exists";
    }else if(responseStr!=null && responseStr.indexOf("RETN=1005")>0  ) {
      responseStr = "Cannot order due to mutually exclusive price.";
    }else if(responseStr!=null && responseStr.indexOf("RETN=1006")>0  ) {
      responseStr = "Forbid to order due to no registration.";
    }else if(responseStr!=null && responseStr.indexOf("RETN=1201")>0  ) {
    //	responseStr = "The subscriber has been terminated or has same subscription event order not completed.";
      responseStr = "Dear Customer, You have already subscribed for this package.Thanks.";
    }else if(responseStr!=null && responseStr.indexOf("RETN=1099")>0  ) {
      responseStr = "Unknown error.";
    }
    }catch (e) {
      // TODO: handle exception
      responseStr="Service is not available, Please try again later.";
    }
return responseStr;
  }
  userLoggedIn(){
    this.isLoggedIn = LocalStorageService.getIsLoggedIn();
    console.log("Login")
  
  }
  userLoggedOut(){
    this.isLoggedIn = LocalStorageService.getIsLoggedIn();
    console.log("Logout")
  
  }
}
