import * as Yup from 'yup';

export const valuesSchema = Yup.object().shape({
    productName: Yup.string()
        .required('required!')
        .min(8, 'Words cannot be less than 8!')
        .max(30, 'Words should be less than 30!'),
    cid: Yup.string().required('required!'),
    productColors: Yup.array().of(Yup.string()).min(1, 'required!'),
    productSizes: Yup.array().min(1, 'required!'),
    productPrice: Yup.number().required('required!'),
    productImgs: Yup.array()
        .of(
            Yup.mixed().test('fileFormat', 'Invalid file format', value => {
                if (value instanceof FileList) {
                    for (let i = 0; i < value.length; i++) {
                        const file = value.item(i);
                        if (!file.type.includes('image/')) {
                            return false;
                        }
                    }
                    return true;
                } else {
                    return true;
                }
            })
        )
        .min(1, 'Picture is required!')
        .required('Required!'),
    productContent: Yup.string()
        .required('required!')
        .min(50, 'Words cannot be less than 50!')
        .max(550, 'Words should be less than 550!')
});