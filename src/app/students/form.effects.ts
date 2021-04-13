import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { RegistationFormComponent } from 'src/app/students/registation-form/registation-form.component';

import * as formDataActions from './form.action';
import formData from './form.model';

@Injectable()
export class formDataEffects {
    constructor(private http: HttpClient, private action$: Actions, private router: Router) { }

    private ApiURL: string = 'http://localhost:3000/student_list';

    CreateFormData$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(formDataActions.BeginCreateformDataAction),
            mergeMap(action =>
                this.http
                    .post(this.ApiURL, JSON.stringify(action.payload), {
                        headers: { 'Content-Type': 'application/json' }
                    })
                    .pipe(
                        map(() => {
                            document.getElementById('connectionErrorOrDataSubmitted').innerText = "Data successfully submitted";
                            return formDataActions.SuccessCreateformDataAction();
                        }),
                        catchError((error: Error) => {
                            document.getElementById('connectionErrorOrDataSubmitted').innerText = "Error connecting to server....Comeback after few time and try";
                            return of(formDataActions.ErrorformDataAction(error));
                        })
                    )
            )
        )
    );
    // formDataActions.SuccessCreateformDataAction()

    GetToDos$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(formDataActions.BeginGetformDataAction),
            mergeMap(action =>
                this.http.get(this.ApiURL).pipe(
                    map((data: formData[]) => {
                        return formDataActions.SuccessGetformDataAction({ payload: data });
                    }),
                    catchError((error: Error) => {
                        return of(formDataActions.ErrorformDataAction(error));
                    })
                )
            )
        )
    );

}