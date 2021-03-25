import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  carts: [],
  currentRestaurant: null,
  transactions: [],
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_CART":
      const findProductById = state.carts.find((cart) => cart.id == payload.id);

      if (findProductById) {
        const updatedCharts = state.carts.map((cart) =>
          cart.id == payload.id
            ? {
                ...cart,
                qty: cart.qty + 1,
              }
            : cart
        );
        return {
          ...state,
          carts: updatedCharts,
        };
      }

      return {
        ...state,
        carts: [
          ...state.carts,
          {
            ...payload,
            qty: 1,
          },
        ],
      };
      break;
    case "REMOVE_CART":
      const findProductByIdRemove = state.carts.find(
        (cart) => cart.id == payload.id
      );

      if (findProductByIdRemove) {
        const updatedChartsRemove = state.carts.map((cart) =>
          cart.id == payload.id
            ? {
                ...cart,
                qty: cart.qty > 1 ? cart.qty - 1 : cart.qty,
              }
            : cart
        );
        return {
          ...state,
          carts: updatedChartsRemove,
        };
      }

      return {
        ...state,
        carts: [
          ...state.carts,
          {
            ...payload,
            qty: 1,
          },
        ],
      };
      break;
    case "DELETE_CART":
      const filteredProducts = state.carts.filter(
        (cart) => cart.id !== payload.id
      );
      return {
        ...state,
        carts: filteredProducts,
      };
      break;
    case "EMPTY_CART":
      return {
        ...state,
        carts: [],
      };
      break;
    case "CURRENT_RESTAURANT":
      return {
        ...state,
        currentRestaurant: { id: payload.id, fullName: payload.fullName },
      };
      break;
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, payload],
      };
      break;
    default:
      throw new Error("Out of context");
      break;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
