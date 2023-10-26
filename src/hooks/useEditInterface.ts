import React, { useState } from 'react';

export const useEditInterface = () => {

    const [isDisplay, setIsDisplay] = useState(false);
    const [value, setValue] = useState(null);

    const handleOpenInterface = item => {
        setIsDisplay(true);
        setValue(item);
    };

    const handleCloseInterface = () => {
        setIsDisplay(false);
        setValue(null);
    };

    return { isDisplay, value, setValue, handleOpenInterface, handleCloseInterface };
};
