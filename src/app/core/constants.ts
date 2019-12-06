
import { state } from '@angular/animations';
import { environment } from 'src/environments/environment';

export class Constants {
  static baseURL=environment.baseURL;
  static baseURLv2 = environment.baseURLv2;
  static loginService = Constants.baseURL.concat("user/login");
  static registerService = Constants.baseURL.concat("user/register");
  static LoginApi="001";
  static RegisterApi="002";






  static responseSuccess = "2XX";
  static gymVisitLimitExeeded="498";
  static paymentRequiredError="402";

  static responseInternalServer ="5XX";
  static responseAlreadyExist="0004";
  static classTimingOverlap = "409";
  static userDataKey="User";
  static longitude="Longitude";
  static latitude="Latitude";
  static countryList="CountryList";
  static authToken="Pro-Auth-Token";
  static userAgent="userAgent";

  static userAgentType="web";

  static tempTokenKey="temp_token";
  static usetType="user_type";
  static isLoggedInKey = 'isLoggedIn';
  static isLoggedInWithFacebookKey = 'isLoggedInFacebook';

  static activityListKey="Activity-List-Key";
  static facebookData = "facebook_data"
  static isTrainerMapped="isTrainerMapped";
  static refundAllowed = "refund_allowed";
  static defaultCountry = "default_country";

  static seoActivityKeyWords = 'Seo-Activity-List';
  static metaTrainerList = 'trainerList';
  static metaGymList = 'gymList';
  static connectionRefused: string;
}


