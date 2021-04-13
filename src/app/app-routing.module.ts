import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectAccessGuard } from './direct-access.guard';
import { DataTableComponent } from './students/data-table/data-table.component';
import { HomepageComponent } from './students/homepage/homepage.component';
import { LoginFormComponent } from './students/login-form/login-form.component';
import { RegistationFormComponent } from './students/registation-form/registation-form.component';

const routes: Routes = [
  { path: "homepage", component: HomepageComponent },
  { path: "login", component: LoginFormComponent },
  { path: "datatable", component: DataTableComponent, canActivate: [DirectAccessGuard] },
  { path: "signup", component: RegistationFormComponent },
  { path: "", redirectTo: "homepage", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
