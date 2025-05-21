import { createContext, useState, useEffect } from "react";

export const shopcontext = createContext(null);

const Shopcontext = (props) => {
    const [all_products, setallproducts] = useState([]);
    const [cartitem, setcartitem] = useState({});

    // Function to generate default cart items based on all_products
    const getDefaultCart = (products) => {
        let cart = {};
        products.forEach((product) => {
            cart[product.id] = 0;
        });
        return cart;
    };

    // Fetch products from the backend
    async function getproducts() {
        try {
            const res = await fetch("http://localhost:4000/getproducts");
            const data = await res.json();
            setallproducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    "auth-token":`${localStorage.getItem("auth-token")}`,
                    "Content-Type":'application/json',
                    },
                body:"",
                
            }).then((res)=>res.json()).then((data)=>setcartitem(data))
        }
    }

    // Fetch products on component mount
    useEffect(() => {
        getproducts();
    }, []);

    // Update cart once products are fetched
    useEffect(() => {
        if (all_products.length > 0) {
            setcartitem(getDefaultCart(all_products));
        }
    }, [all_products]);

    // Add item to cart
    const addtocart = (itemId) => {
        setcartitem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

        if (localStorage.getItem("auth-token")) {
            fetch("http://localhost:4000/addtocart", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ itemid: itemId }),
            })
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((error) => console.error("Error adding to cart:", error));
        }
    };

    // Remove item from cart
    const removecart = (itemId) => {
        setcartitem((prev) => ({ ...prev, [itemId]: Math.max(0, prev[itemId] - 1) }));
        if (localStorage.getItem("auth-token")) {
            console.log("hello")
            fetch("http://localhost:4000/removefromcart", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ itemid: itemId }),
            })
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((error) => console.error("Error adding to cart:", error))
        }
    };

    // Calculate total cart value
    const getTotalCart = () => {
        let total = 0;
        for (const item in cartitem) {
            if (cartitem[item] > 0) {
                let info = all_products.find((product) => product.id === Number(item));
                if (info) {
                    total += info.new_price * cartitem[item];
                }
            }
        }
        return total;
    };

    // Get total count of items in cart
    const getcount = () => {
        return Object.values(cartitem).reduce((acc, curr) => acc + curr, 0);
    };

    const contextvalue = { all_products, cartitem, addtocart, removecart, getTotalCart, getcount };

    return <shopcontext.Provider value={contextvalue}>{props.children}</shopcontext.Provider>;
};

export default Shopcontext;
