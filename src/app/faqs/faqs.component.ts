import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {

  constructor() { }
  allfaq = [];
  ngOnInit() {
   let obj1 = {"ques":"What is CHILI? ","ans":"CHILI is the brand name of Mobile Service from MTML"}
   let obj2 = {"ques":"Where can I buy CHILI Mobile? What are the documents required to purchase a Prepaid and Postpaid SIM Card? ","ans":"MTML has its Customer Care Centers / Shops and strong retail distribution network across the island, which sells CHILI SIM cards and recharge coupons.Documents required for Prepaid: National ID Card. Documents required for Post Paid: National ID Card & Proof of Address. "}
   let obj3 = {"ques":"What are the advantages of CHILI? ","ans":"MTML has state of the art technology and a Congestion Free Mobile Network…  Other benefits of CHILI Mobile are: – 4G (4th  generation) Mobile ready network – Best Unlimited and Limited Data Packs. – Best tariff structure (at least 25% economical than other operators) – Unique feature of getting paid on incoming calls – Option of choosing 3 numbers of other operators and calling them at discounted rates (Family numbers) "}
   let obj4 = {"ques":"Do you sell Mobile phones? ","ans":"Yes, we do sell Mobile Phones through our MTML Customer Service Centers or Shops. For more details kindly dial our Call Center 8960 or visit the product section of this website.  Also can check for bundled offers (phone + service). "}
   let obj5 = {"ques":"What is the cost of a call? Do you charge per second? ","ans":"Yes, we offer different plans based on per second billing for voice. For more details refer to the tariff table. "}
   let obj6 = {"ques":"If I make only a 5 seconds call? How much will I be charged? ","ans":"MTML charges on per second basis for CHILI Mobile hence the charge would be for 5 seconds only "}
   let obj7 = {"ques":"What is Off Peak time? ","ans":"Off Peak Time is the time when you can enjoy calling at lower rate in some of the plans. The Off Peak Time for CHILI Mobile is from Monday to Saturday, from 22:00hrs. to 7:00 hrs of the next day and, on Sunday full day. "}
   let obj8 = {"ques":"I have an Orange / Emtel number, will I be able to keep the same number on CHILI Mobile?","ans":"The regulation in Mauritius does not allow Mobile Number Portability (MNP) i.e. keeping the same number with other mobile operator. However we will try our best to give you the last 3-4 matching numbers as your existing mobile number if available. "}
   let obj9 = {"ques":"I’m going abroad; will I have access in other countries? Can I roam with CHILI? ","ans":"Yes, CHILI Mobile has roaming tie-up with most of the leading mobile operators across the world. So you can go for Tension free Roaming anywhere in the world with the best rates in market. For more details kindly call our Call Centers 8960 or visit the roaming pages of this website. "}
   let obj10 = {"ques":"How to activate DATA or GPRS ? What is the cost? If I exceed the limit given, will there be any additional cost? What is the speed? ","ans":"For Prepaid: send SMS ‘act net’ to 8200. For Postpaid: send SMS ‘act gprs’ to 8200. Pl. ensure the APN (Access Point Name) is configured in Settings as: mtml or chili  No need of any username and password in the APN settings. For more details about APN settings, data packages (unlimited and limited), tariff and activation, please call our Call Center 8960 or visit the Internet page of this website. "}
   let obj11 = {"ques":"How can I use the 4G or LTE service to get high speed internet on Mobile and how to activate it?","ans":"To use 4G or LTE service: you can just send SMS: ‘act 4g’ to 8200. "}
   let obj12 = {"ques":"What should I dial (code) to make International call? What is the tariff? ","ans":"To make an International call, just dial + or 00 (double zero) followed by country code and mobile/ Phone number. (E.g +44254866455 or 0044254866455) For more details kindly call our Call Centers 8960 or visit the International Calling page of this website. "}
   let obj13 = {"ques":"What should I dial (code) to make International call when I am not CHILI user and want to use CHILI cheaper International call rates? Can I use other operator phones to use the International service provided by MTML. What is service name & where I can find the tariffs for this? ","ans":"MTML offers two types of services for non-CHILI users for International Calls, when you are not Chili user and use other operator numbers; VCC Pre-Paid Service: Other operator customers can dial 8000061 to first register as VCC Prepaid user then recharge this account using the same IVR flow with CHILI recharge card. VCC Post-Paid Service: As this is a post paid service, to register you need to visit the MTML Customer Care or Shop with NID, Address proof and your recent Bill from existing service provider. For more details kindly call our Call Centers 8960. "}
   let obj14 = {"ques":"How to use the VCC Pre-paid Service for cheaper International call rates using MTML network? ","ans":"First register for the service and ensure you have enough balance on this account in order to use the VCC Pre-paid service for International Calls. Use prefix 061 instead of + or 00 when dialing international number. (E.g 06186254866455) "}
   let obj15 = {"ques":"How to use the VCC Post-paid Service for cheaper International call rates using MTML network? ","ans":"First register for the service and ensure you have enough credit on this account in order to use the VCC Post-paid Service for International Calls. Use prefix 060 instead of + or 00 when dialing international number. (E.g 06086254866455) "}
   let obj16 = {"ques":"How can I know Balance and Recharge my VCC Pre-paid account for International calls? ","ans":"You can use CHILI recharge card for recharging the VCC Pre-paid account; Pl. Dial 8000061 and press 2 for Recharge and for Balance Query press 3  "}
   let obj17 = {"ques":"Do you have network coverage everywhere in Mauritius? Does it work in Rodrigues as well? ","ans":"MTML has network coverage all across the island. We are in the process of having roaming tie-up in Rodrigues and deploying network there. "}
   let obj18 = {"ques":"What is the Family Number Service and how to activate it? ","ans":"Family Number is a Value Added service that enables you to call up to 3 numbers of any networks at lower call rate. To add a preferred number, dial *120* Preferred phone number #. For more details about tariff and activation, please call our Call Centre 8960 or visit the Value Add section of the website. "}
   let obj19 = {"ques":"Do you have FREEDOM Plan on GSM? ","ans":"On CHILI Mobile (GSM) we have FREEDOM Plan. Please call our Call Centre 8960 or visit the website. "}
   let obj20 = {"ques":"What is the SMS service center number? ","ans":"SMS Service Centre Number of CHILI Mobile Service is +2309699997. "}
   let obj21 = {"ques":"What to do if my SMS service does not work? ","ans":"Pl. check if the Message Settings has SMS Service Centre Number is +2309699997 saved in it. Check if your In-box is full or storage on phone is full. Then delete some unwanted messages to free space and try again. Pl. check if there is any application like truecaller, etc blocking the incoming SMS or any messenger app not allowing outgoing SMS from phone. May uninstall and try. Or else can call our Call Centre 8960 for help to check this. "}
   let obj22 = {"ques":"What are the denominations of scratch cards that you have? Where can I buy a scratch card? Do you have e-pin or e-voucher? ","ans":"The denominations of CHILI Mobile recharge cards are: Rs25, Rs50, Rs100 and Rs 300. The cards are available across the country through our retail distribution partners. For more details please call our Call Centre 8960 or visit the Products page of this website. "}
   let obj23 = {"ques":"Can I use the CHILI SIM Card on any mobile? ","ans":"CHILI SIM cards can be used on any GSM/ 3G Mobile handset. "}
   let obj24 = {"ques":"Can I transfer money from one CHILI Mobile to another CHILI Mobile? Can I transfer money from MTML CDMA Prepaid mobile to CHILI Prepaid mobile?","ans":"Yes, CHILI Mobile customer can recharge another CHILI Mobile or MTML CDMA mobile by Balance Transfer service and vice versa. Procedure for balance transfer: Dial *333*<Amount>*<Phone No.>*<Password>#. "}
   let obj25 = {"ques":"How can I set Caller Ring Back Tunes (CRBT) set on my mobile? ","ans":"The CRBT can be set by dialing 8585 from CHILI Mobile "}
   let obj26 = {"ques":"Does CHILI provide Micro and Nano SIM cards? ","ans":"Yes, CHILI provides Regular, Micro and Nano SIM cards. "}
   let obj27 = {"ques":"How can I recharge my CHILI Mobile account? ","ans":"Scratch off the security area of your Recharge card to reveal the 13 digits PIN Please Dial *111* enter 13 digit PIN # "}
   let obj28 = {"ques":" I want to recharge my friend’s CHILI Mobile . How can I do it?","ans":"   You can recharge any CHILI Mobile number: Dial 59591111 from any phone Select language by pressing 1 for English, 2 for French, 3 for Hindi or 4 for Chinese. Press 1 if you want to recharge your own account or 2 if you want to recharge any other account. Follow instructions. "}
   let obj29 = {"ques":"How can I check the balance of CHILI Prepaid Mobile? ","ans":"Please Dial *222# and you will receive Balance and validity information"}
   let obj30 = {"ques":"How can I recharge my CHiLi Mobile number online? ","ans":"Please use the CHILI APP or web site for online recharge. Please use your MCB bank account for online recharge. "}
   let obj31 = {"ques":"Where and How can I pay my CHiLi Mobile post paid connection monthly bill? ","ans":"We have many channels to do this:May pay your post-paid bills using CHILI APP or website for online payment. May visit MTML Customer Care or Shops or nearest Post Office. Can also subscribe for Direct Debit from your bank account using ECS service of bank and opt for this by visiting Customer Care or MTML Shop ."}
   let obj32 = {"ques":"How can I check my CHiLi Mobile number? ","ans":"Please Dial *666# using your CHILI number. "}
   let obj33 = {"ques":"How can I get Emergency SOS or Advance talk-time on my CHiLi Prepaid Mobile? ","ans":"Please Send SMS “CREDIT” to 8300 or can Dial *777#"}
   this.allfaq.push(obj1);
   this.allfaq.push(obj2);
   this.allfaq.push(obj3);
   this.allfaq.push(obj4);
   this.allfaq.push(obj5);
   this.allfaq.push(obj6);
   this.allfaq.push(obj7);
   this.allfaq.push(obj8);
   this.allfaq.push(obj9);
   this.allfaq.push(obj10);
   this.allfaq.push(obj11);
   this.allfaq.push(obj12);
   this.allfaq.push(obj13);
   this.allfaq.push(obj14);
   this.allfaq.push(obj15);
   this.allfaq.push(obj16);
   this.allfaq.push(obj17);
   this.allfaq.push(obj18);
   this.allfaq.push(obj19);
   this.allfaq.push(obj20);
   this.allfaq.push(obj21);
   this.allfaq.push(obj22);
   this.allfaq.push(obj23);
   this.allfaq.push(obj24);
   this.allfaq.push(obj25);
   this.allfaq.push(obj26);
   this.allfaq.push(obj27);
   this.allfaq.push(obj28);
   this.allfaq.push(obj29);
   this.allfaq.push(obj30);
   this.allfaq.push(obj31);
   this.allfaq.push(obj32);
   this.allfaq.push(obj33);

   
  }

}
