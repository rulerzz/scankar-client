import { AuthService } from './auth.service';
import { SharedModule } from './../shared.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'forgotpassword',
        component: ForgotPasswordComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [AuthComponent, LoginComponent, ForgotPasswordComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [AuthService],
  exports: [AuthComponent, LoginComponent, ForgotPasswordComponent],
})
export class AuthModule {}
