import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
} from "../Components/CartActions";

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Logic to add item to cart and update totalPrice
      return {
        ...state,
        items: [...state.items, action.payload],
        totalPrice: state.totalPrice + action.payload.price,
      };
    case REMOVE_FROM_CART:
      // Logic to remove item from cart and update totalPrice
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        totalPrice:
          state.totalPrice -
          state.items.find((item) => item.id === action.payload).price,
      };
    case UPDATE_QUANTITY:
      // Logic to update item quantity and totalPrice
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.itemId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        totalPrice: state.items.reduce(
          (total, item) =>
            item.id === action.payload.itemId
              ? total + item.price * action.payload.quantity
              : total + item.price * item.quantity,
          0
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
