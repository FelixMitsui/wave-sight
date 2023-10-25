/** @format */

import * as React from 'react';

type GetImageSrcParams = {
    event: React.ChangeEvent<HTMLInputElement> | null;
    fieldName: string;
    setFieldValue: (field: string, value: any[]) => void;
    values: any[];
};

export const getImageSrc = ({
    event,
    fieldName,
    setFieldValue,
    values,
}: GetImageSrcParams): void => {
    const fileList = Array.from(event.target.files);

    for (const file of fileList) {
        const reader = new FileReader();
        reader.onload = () => {
            values.push({ imgUrl: reader.result, imgFile: file });
            setFieldValue(fieldName, values);
        };
        reader.readAsDataURL(file);
    }
};
