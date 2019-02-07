import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminGuard } from './auth/admin.guard';

const routes: Routes = [{
  path: '', redirectTo: 'signin', pathMatch: 'full'
},
{
  path: 'signup',
  component: UserComponent,
  children: [{ path: '', component: SignUpComponent}]
},
{
  path: 'signin',
  component: UserComponent,
  children: [{ path: '', component: SignInComponent}]
},
{
  path: 'userprofile',
  component: UserProfileComponent,
  canActivate: [AuthGuard]
},
{
  path: 'adminprofile',
  component: AdminProfileComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
