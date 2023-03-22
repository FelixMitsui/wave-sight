/** @format */
import { useReducer } from 'react';

const initialInput = {
    value: '',
    isValid: true,
    isTouched: false
};

const inputReducer = (state, action) => {
    switch (action.type) {
        case "INPUT":
            return { value: action.value, isValid: state.isValid };
        case "BLUR":
            return { value: state.value, isValid: action.isValid, isTouched: true };
        default:
            return state;
    }
}

const useInputValidate = (validateValue) => {
    const [input, dispatch] = useReducer(inputReducer, initialInput);

    const onChangeValue = (e) => {
        dispatch({ type: "INPUT", value: e.target.value });
    };

    const onBlurValue = () => {

        dispatch({ type: "BLUR", isValid: validateValue(input.value) });

    };

    return {
        value: input.value,
        isValid: input.isValid,
        isConfirm: input.isTouched === input.isValid,
        onChangeValue,
        onBlurValue,
    };
};

export default useInputValidate