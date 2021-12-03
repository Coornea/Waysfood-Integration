import { useReducer, createContext } from "react";

export const AppContext = createContext();

const initialState = {
  isLogin: false,
  user: {},
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("login", JSON.stringify(payload));
      return {
        ...state,
        isLogin: true,
        user: payload,
      };
      break;
    case "CHECK_AUTH":
      return {
        ...state,
        isLogin: true,
      };
      break;
    default:
      throw new Error();
  }
}

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};
