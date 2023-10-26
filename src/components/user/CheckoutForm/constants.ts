import * as Yup from 'yup';

export const valuesSchema = Yup.object().shape({
    userName: Yup.string()
        .required('required!')
        .min(3, 'Words cannot be less than 3!')
        .max(15, 'Words should be less than 15!'),
    userEmail: Yup.string()
        .required('required!')
        .email('Invalid format!')
        .min(12, 'Words cannot be less than 12!')
        .max(26, 'Words should be less than 26!'),
    userAddress: Yup.string()
        .required('required!')
        .min(6, 'Words cannot be less than 6!')
        .max(30, 'Words should be less than 30!'),
    userPhone: Yup.string()
        .required('Required!')
        .test('is-valid-phone', 'Invalid format!', value => {
            if (value) {
                return /^0\d{9}$/.test(value);
            }
            return false;
        })
        .min(10, 'Words cannot be less than 10!')
        .max(10, 'Words should be less than 10!'),
    deliveryMethod: Yup.string().required('required!'),
    payMethod: Yup.string().required('required!'),
    remark: Yup.string().max(25, 'Words should be less than 30!'),
    invoice: Yup.object().shape({
        type: Yup.string().required('required!!'),
        number: Yup.string().when('type', {
            is: 'Paper invoice',
            then: Yup.string().notRequired(),
            otherwise: Yup.string()
                .required('required!')
                .min(8, 'Words cannot be less than 8!')
                .max(12, 'Words should be less than 12!'),
        }),
    }),
});