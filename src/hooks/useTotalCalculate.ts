import { useState } from 'react';

const useTotalCalculate = () => {

    const [totalCash, setTotalCash] = useState<number>(0);

    const handleTotalCalculate = (price) => {
        setTotalCash(prev => prev + price);
    };

    return [totalCash, handleTotalCalculate];
};

export default useTotalCalculate;
