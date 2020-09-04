import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { registerLocaleData } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactComponent } from './contact/contact.component';
import { ServicesComponent } from './services/services.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MainPageComponent } from './main-page/main-page.component';




const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomePageComponent, children: [

      { path: 'mainPage', component: MainPageComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'edit-profile', component: EditProfileComponent }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
