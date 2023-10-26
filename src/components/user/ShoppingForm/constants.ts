import * as Yup from 'yup';

export const valuesSchema = Yup.object().shape({
    color: Yup.string().required('Please pick a color!'),
    size: Yup.string().required('Please pick a size!'),
});
