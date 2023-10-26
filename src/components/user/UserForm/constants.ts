import * as Yup from 'yup';

export const valuesSchema = Yup.object().shape({
    userPhone: Yup.string()
        .required('required!')
        .test('is-valid-phone', 'Invalid format!', value => {
            if (value) {
                return /^0\d{9}$/.test(value);
            }
            return false;
        })
        .min(10, 'Words cannot be less than 10!')
        .max(10, 'Words should be less than 10!'),
    userAddress: Yup.string()
        .required('required!')
        .min(6, 'Words cannot be less than 6!')
        .max(28, 'Words should be less than 28!'),
});