import { Constants } from '../constants';
import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {

  static  getToken(): any {
    return localStorage.getItem(Constants.authToken);
  }

  static setToken(token: any): void {
    localStorage.setItem(Constants.authToken, token.toString());
  }

  static deleteToken(): void {
    localStorage.removeItem(Constants.authToken);
  }

  static setUser(user: any): void {
    localStorage.setItem(Constants.userDataKey, JSON.stringify(user));
  }

  static getUser(): any {
     return JSON.parse(localStorage.getItem(Constants.userDataKey)) ;
  }

  static deleteUser(): void {
    localStorage.removeItem(Constants.userDataKey);

  }

  static getUserId(): number {
    const user: any = LocalStorageService.getUser();
    if (user) {
    return user.data.id;
      } else {
      return 0;
    }

  }

  static getUserGender(): any {
    const user: any = LocalStorageService.getUser();
      return user.data.gender
  }

  static setUserType(type: string): void {
    localStorage.setItem(Constants.usetType, type);
  }
  static setRefundPolicy(refundAllowedBefore: any) {
    localStorage.setItem(Constants.refundAllowed, JSON.stringify(refundAllowedBefore));
  }
  static getRefundValue(): any {
    if (localStorage.getItem(Constants.refundAllowed)) {
      return JSON.parse(localStorage.getItem(Constants.refundAllowed));
    }
  }

  static getUserTypeString(): string {
    if (localStorage.getItem(Constants.usetType)) {
      return localStorage.getItem(Constants.usetType).toLowerCase();
    }
  }
  static getUserType(): number {
      let usertype= 1
     if (localStorage.getItem(Constants.usetType)) {
            if (localStorage.getItem(Constants.usetType) === "Customer") {
              usertype = 1;
          }
             if (localStorage.getItem(Constants.usetType) ==='Trainer') {
              usertype = 2;
            }
            if (localStorage.getItem(Constants.usetType) ==='Gym') {
              usertype = 3;
            }

      } else {
              usertype = 1;

          }
  return usertype;
  }
  static setIsLoggedIn(isLogin: boolean): void {
    localStorage.setItem(Constants.isLoggedInKey, String(isLogin));
  }
  static isLoggedIn(): boolean {
    return Boolean(localStorage.getItem(Constants.isLoggedInKey));
  }

  static setIsLoggedInWithFaceBook(isLogin:boolean):void{
    localStorage.setItem(Constants.isLoggedInWithFacebookKey,String(isLogin));
  }

  static IsLoggedInWithFaceBook():boolean{
    if(localStorage.getItem(Constants.isLoggedInWithFacebookKey)){
      return Boolean(localStorage.getItem(Constants.isLoggedInWithFacebookKey));
         }else{
        return false;
      }

  }
  static setFacebookData(facebookData){
    localStorage.setItem(Constants.facebookData, JSON.stringify(facebookData));
  }
  static getFacebookData() {
    return localStorage.getItem(Constants.facebookData)
  }

  static getIsLoggedIn(): boolean {
    if (localStorage.getItem(Constants.userDataKey)) {
    return Boolean(localStorage.getItem(Constants.userDataKey));
       } else {
      return false;
    }
  }
  static setClassTimingCheck(classId: any, isChecked: boolean) {
    const classTimingJson = {'userId': this.getUserId(), 'isChecked': isChecked}
    localStorage.setItem(classId, JSON.stringify(classTimingJson))
  }
  static getClassTimingCheck(classId: any): any {
    if (localStorage.getItem(classId)) {
    const classTimingJson = JSON.parse(localStorage.getItem(classId))
      return  (classTimingJson['isChecked'] && classTimingJson['userId'] === this.getUserId())
    } else {
      return false;
    }
  }

   static setIsTrainerMapped(isLogin: boolean): void {
    localStorage.setItem(Constants.isTrainerMapped, String(isLogin));
  }

  static getIsTrainerMapped(): any {
    if (localStorage.getItem(Constants.isTrainerMapped)) {
    return localStorage.getItem(Constants.isTrainerMapped);
       } else {
      return false;
    }
  }

 

  static setActivitiesList(activityData): void {
    localStorage.setItem(Constants.activityListKey, JSON.stringify(activityData));
    const keywordList = []
    activityData.data.forEach(element => {
      keywordList.push(element.name + ' kuwait')
        });
    localStorage.setItem(Constants.seoActivityKeyWords, keywordList.join())
}
  static getActivityListData() {
    return localStorage.getItem(Constants.seoActivityKeyWords)
//  return JSON.parse(localStorage.getItem(Constants.activityListKey)) ;
  }

      static setData(key, data) {
            localStorage.setItem(key, data);

      }
            static getData(key): any {
     return localStorage.getItem(key) ;
      }

static clearStorage(): void {
  localStorage.removeItem(Constants.userDataKey);
  localStorage.removeItem(Constants.authToken);
  localStorage.removeItem(Constants.usetType);
  localStorage.removeItem(Constants.isLoggedInKey);

}
static setTrainerList(trainerList: any) {
  localStorage.setItem(Constants.metaTrainerList, trainerList.join())
}
static getTrainerList() {
  localStorage.getItem(Constants.metaTrainerList)
}
static setGymList(gymList: any) {
  localStorage.setItem(Constants.metaGymList, gymList.join())
}
static getGymList() {
  localStorage.getItem(Constants.metaGymList)
}

}
