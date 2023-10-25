import { useEffect, useState } from 'react';

const useTotalCalculate = () => {

    const [totalCash, setTotalCash] = useState(0);

    const handleTotalCalculate = (price) => {
        setTotalCash(prev => prev + price);
    };

    return [totalCash, handleTotalCalculate];
};

export default useTotalCalculate;
