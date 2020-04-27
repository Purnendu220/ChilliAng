import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-locate-us',
  templateUrl: './locate-us.component.html',
  styleUrls: ['./locate-us.component.css']
})
export class LocateUsComponent implements OnInit {
  storeList=[]
  constructor() { }
  nameList=["Goodlands","Flacq","Port Louis","Ebene","Quatre Bornes","Curepipe","Chemin Grenier","Rose Belle"];
  addressList=["Mosque Avenue ","A-26, Flacq Coeur de Ville, Avenue President Francois, Mitterrand, Central Flacq. ","10 GF, CSK Building, Sir Celli Court Antelme Street ","MTML Square, 63, Cybercity, Ebene ","2, Osman Avenue, Near Post office","10, Royal Road, Curepipe ","Royal Road ","Plaisance Shopping Village (J05)"];
  teleList=["5292 8060","5290 8060","5291 0060","5290 6060 ","5292 6060 ","5291 5060 ","5291 2244 ","5290 6040 "];


  ngOnInit() {
 for(let i=0;i<this.nameList.length;i++){
    let obj = {"name":this.nameList[i],"address":this.addressList[i],"tele":this.teleList[i]}
    this.storeList.push(obj);
  }

  }

}
