import { useCallback, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.name]: action.value
      };
    case 'RESET':
      return Object.keys(state).reduce((acc, current) => {
        acc[current] = '';
        return acc;
      }, {});
    default:
      return state;
  }
}

const useInputs = (initialForm) => {
  const [form, dispatch] = useReducer(reducer, initialForm);
  //change
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: "CHANGE", name, value });
  }, []);

  // 방법 1
  // const reset = useCallback(() => dispatch({ type: "RESET", form: initialForm }, [initialForm]));

  // 방법 2
  const reset = useCallback(() => dispatch({ type: "RESET" }, []));

  // setForm(initialForm), [initialForm]);
  return [form, onChange, reset];
};

export default useInputs;
