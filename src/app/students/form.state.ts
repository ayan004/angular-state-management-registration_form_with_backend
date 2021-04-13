import formData from './form.model';

export default class studentListState {
    studentList: Array<formData>;
    SlError: Error;
}

export const initializeState = (): studentListState => {
    return { studentList: Array<formData>(), SlError: null };
};

