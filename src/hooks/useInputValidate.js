import { useReducer } from 'react';

const initialInput = {
  value: '',
  isValid: false,
  isTouched: false,
  message: '',
};

const inputReducer = (state, action) => {
  switch (action.eventType) {
    case 'INPUT':
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        isTouched: true,
      };
    case 'BLUR':
      let message;
      if (state.value === '') {
        message = `The ${action.type} cannot be empty.`;
      } else {
        if (action.type === 'confirm password') {
          message = `Password and ${action.type} do not match.`;
        } else {
          message = `The ${action.type} format is incorrect.`;
        }
      }
      return { ...state, isValid: action.isValid, isTouched: true, message };
    default:
      return state;
  }
};

const useInputValidate = (validateValue, type) => {
  const [input, dispatch] = useReducer(inputReducer, initialInput);

  const onChangeValue = e => {
    dispatch({
      eventType: 'INPUT',
      value: e.target.value,
      isValid: validateValue(e.target.value),
    });
  };
  const onBlurValue = () => {
    dispatch({ eventType: 'BLUR', isValid: validateValue(input.value), type });
  };

  return {
    value: input.value,
    message: input.message,
    isValid: input.isValid,
    isConfirm: input.isTouched && input.isValid,
    onChangeValue,
    onBlurValue,
  };
};

export default useInputValidate;
