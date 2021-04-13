import { createAction, props } from '@ngrx/store';
import formData from './form.model';

export const BeginGetformDataAction = createAction('[formData] - Begin Get formData');

export const SuccessGetformDataAction = createAction(
    '[formData] - Success Get formData',
    props<{ payload: formData[] }>()
);

export const BeginCreateformDataAction = createAction(
    '[formData] - Begin Create formData',
    props<{ payload: formData }>()
);
// this payload contains the formdata to be submitted to the server

export const SuccessCreateformDataAction = createAction(
    '[formData] - Success Create formData'
);
// here I have to insert one payload, that will contain the formdata to be submitted to the store 

export const ErrorformDataAction = createAction('[formData] - Error', props<Error>());