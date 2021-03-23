import { createContext, useReducer, useEffect } from "react";

export const UserContext = createContext();

const LOCAL_KEY = "ways-food-user";

const initialState = {
  isLogin: false,
  users: [],
  loggedUser: null,
  orderLocation: { lng: 106.735157, lat: -6.301431 },
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      return {
        ...state,
        isLogin: true,
        loggedUser: payload,
      };
      break;
    case "LOGOUT":
      localStorage.removeItem(`${LOCAL_KEY}-login`);
      return {
        ...state,
        isLogin: false,
        loggedUser: null,
      };
      break;
    case "ORDER_LOC":
      return {
        ...state,
        orderLocation: payload,
      };
      break;

    default:
      throw new Error("Out of context");
      break;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    !localStorage.getItem(LOCAL_KEY) &&
      localStorage.setItem(LOCAL_KEY, JSON.stringify([]));
    const getUser = localStorage.getItem(`${LOCAL_KEY}-login`);
    if (getUser) {
      dispatch({
        type: "LOGIN",
        payload: JSON.parse(getUser),
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
