import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuardService } from './core/service/auth-gaurd.service';
import { QuickRechargeComponent } from './quick-recharge/quick-recharge.component';
import { PackagesComponent } from './packages/packages.component';
import { LocateUsComponent } from './locate-us/locate-us.component';
import { SupportComponent } from './support/support.component';
import { FaqsComponent } from './faqs/faqs.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
     pathMatch:'full'

  },
  {
  path: 'accountDetail',
  component: CustomerPageComponent,
  pathMatch:'full',
},
{
  path: 'quickrecharge',
  component: QuickRechargeComponent,
  pathMatch:'full',

},
{
  path: 'packages',
  component: PackagesComponent,
  pathMatch:'full',
  canActivate:[AuthGuardService]

},
{
  path: 'locateus',
  component: LocateUsComponent,
  pathMatch:'full',

},
{
  path: 'support',
  component: SupportComponent,
  pathMatch:'full',

},
{
  path: 'faqs',
  component: FaqsComponent,
  pathMatch:'full',

},
{
  path: 'login',
  component: LoginComponent,
  pathMatch:'full',
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
