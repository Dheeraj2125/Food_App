import React, { useReducer, useContext, createContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            // Check if item already exists in cart, update quantity if true
            let updated = false;
            const newState = state.map(item => {
                if (item.id === action.id && item.size === action.size) {
                    updated = true;
                    return { ...item, qty: item.qty + action.qty };
                }
                return item;
            });
            // If item doesn't exist, add it to the cart
            if (!updated) {
                newState.push({
                    id: action.id,
                    name: action.name,
                    qty: action.qty,
                    size: action.size,
                    price: action.price,
                    img: action.img
                });
            }
            return newState;

        case "REMOVE":
            // Remove item from cart based on index
            const newArr = [...state];
            newArr.splice(action.index, 1);
            return newArr;

        case "DROP":
            // Clear cart
            return [];

        case "UPDATE":
            // Update quantity and price of an item in the cart
            return state.map(item => {
                if (item.id === action.id && item.size === action.size) {
                    return { ...item, qty: action.qty, price: action.price };
                }
                return item;
            });


        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);