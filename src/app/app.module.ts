import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { QuickRechargeComponent } from './quick-recharge/quick-recharge.component';
import { PackagesComponent } from './packages/packages.component';
import {AccordionModule} from 'primeng/accordion';
import { LocateUsComponent } from './locate-us/locate-us.component';
import { SupportComponent } from './support/support.component';
import { FaqsComponent } from './faqs/faqs.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuardService } from './core/service/auth-gaurd.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CustomerPageComponent,
    HomePageComponent,
    QuickRechargeComponent,
    PackagesComponent,
    LocateUsComponent,
    SupportComponent,
    FaqsComponent,
    LoginComponent,
    RegistrationComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AccordionModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
