
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "http://localhost:4000";

    const [cartItems, setCartItems] = useState({});
    const [foodList, setFoodList] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    // item adding to cart
    const addToCart = async (itemId) => {

        // updating ui 
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev?.[itemId] ? prev[itemId] + 1 : 1
        }));

        if (token) {
            await axios.post(
                url + "/api/cart/add",
                { itemId },
                { headers: { token } }
            );
        }
    };

    //  removing item from cart
    const removeFromCart = async (itemId) => {

        setCartItems((prev) => {
            if (!prev[itemId]) return prev;

            const updatedCart = { ...prev };
            updatedCart[itemId] -= 1;

            if (updatedCart[itemId] <= 0) {
                delete updatedCart[itemId];
            }

            return updatedCart;
        });

        if (token) {
            await axios.post(
                url + "/api/cart/remove",
                { itemId },
                { headers: { token } }
            );
        }
    };

// calculating total amout 
    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartItems) {
            const itemInfo = foodList.find(
                (product) => product._id === item
            );

            if (itemInfo) {
                totalAmount += itemInfo.price * cartItems[item];
            }
        }

        return totalAmount;
    };

        // fetching food list data
    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data || []);
    };

    // loading data from backend
    const loadCartData = async (token) => {
        const response = await axios.post(
            url + "/api/cart/get",
            {},
            { headers: { token } }
        );

        setCartItems(response.data.cartData || {});
    };

    // initial load
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();

            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        }

        loadData();
    }, []);

    const contextValue = {
        foodList,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;