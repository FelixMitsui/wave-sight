import React, { useState, useRef } from 'react';


const useCounter = (outsideQuantity) => {

    const [quantity, setQuantity] = useState(outsideQuantity);



    const triggerCounter = (target) => {

        switch (target) {

            case '+':

                if (quantity >= 1) {
                    setQuantity(prev => prev + 1)
                }

                break;

            case '-':

                if (quantity <= 1) {
                    return;
                }

                setQuantity(prev => prev - 1);
                break;
        }
    }

    return [quantity, triggerCounter];
};

export default useCounter;
