import { Action, createReducer, on } from '@ngrx/store';
import * as formDataActions from './form.action';
import formData from './form.model';
import studentListState, { initializeState } from './form.state';

export const initialState = initializeState();

const reducer = createReducer(
    initialState,
    // on(formDataActions.GetToDoAction, state => state),
    // on(ToDoActions.CreateToDoAction, (state: ToDoState, todo: ToDo) => {
    //     return { ...state, ToDos: [...state.ToDos, todo], ToDoErrror: null };
    // }),
    on(formDataActions.SuccessGetformDataAction, (state: studentListState, { payload }) => {
        return { ...state, studentList: payload };
    }),
    // on(ToDoActions.SuccessCreateToDoAction, (state: ToDoState, { payload }) => {
    //     return { ...state, ToDos: [...state.ToDos, payload], ToDoError: null };
    // }),
    // on(ToDoActions.ErrorToDoAction, (state: ToDoState, error: Error) => {
    //     console.log(error);
    //     return { ...state, ToDoError: error };
    // })
);

export function formDataReducer(state: studentListState | undefined, action: Action) {
    return reducer(state, action);
}