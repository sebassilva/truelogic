import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MemoriesComponent } from './memories/memories.component';
import { AuthGuard } from './guards/auth-guard.service';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'memories', component: MemoriesComponent, canActivate: [AuthGuard] },

  // Redirect non existing to login
  {path: '**', redirectTo: 'login', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
