import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    author: Yup.string()
        .required('Name is required'),
});
