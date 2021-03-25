import { createContext, useReducer, useEffect } from "react";

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  users: [],
  loggedUser: null,
  orderLocation: { lng: 106.735157, lat: -6.301431 },
  orderPlace: "",
  loading: true,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "EDIT_SUCCESS":
    case "LOGIN_SUCCESS":
    case "LOGIN":
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isLogin: true,
        loggedUser: {
          id: payload.id,
          fullName: payload.fullName,
          email: payload.email,
          image: payload.image,
          role: payload.role,
          phone: payload.phone,
        },
        loading: false,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isLogin: false,
        loggedUser: null,
        loading: false,
      };
    case "ORDER_LOC":
      return {
        ...state,
        orderLocation: payload,
      };
    case "ORDER_PLACE":
      return {
        ...state,
        orderPlace: payload,
      };

    default:
      throw new Error("Out of context");
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
