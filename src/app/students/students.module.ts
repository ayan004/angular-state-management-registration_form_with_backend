import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegistationFormComponent } from './registation-form/registation-form.component';
import { DataTableComponent } from './data-table/data-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { formDataEffects } from 'src/app/students/form.effects';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { reducers, metaReducers } from './reducers';
import { environment } from 'src/environments/environment';
import { formDataReducer } from './form.reducer';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [RegistationFormComponent, DataTableComponent, HomepageComponent, LoginFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forRoot([formDataEffects]),
    StoreModule.forRoot({ listOfStudent: formDataReducer }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    RouterModule
  ]
})

export class StudentsModule { }


// StoreModule.forRoot(reducers, { metaReducers }),
