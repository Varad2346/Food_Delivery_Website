import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios"
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setcartItems] = useState({});
  const [token, setToken] = useState("")
  const [food_list, setFoodList] = useState([]);


  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setcartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post('http://localhost:3000/api/cart/add',{itemId},{headers:{token}});
    }
  };

  const removeFromCart = async(itemId) => {
    setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post('http://localhost:3000/api/cart/remove',{itemId},{headers:{token}});
    }
  };

  const getTotalCartAmount=()=>{
    let totalAmount=0;
    for(const item in cartItems){
      if(cartItems[item]>0){
        let itemInfo=food_list.find((product)=>product._id===item)
        totalAmount+=itemInfo.price * cartItems[item]
      }
    }
    return totalAmount
  }

  const fetchFoodList=async()=>{
    const response=await axios.get("http://localhost:3000/api/food/list")
    setFoodList(response.data.data);
    console.log("res",response.data.data);
  }

  const loadCartData=async(token)=>{
    const response=await axios.post("http://localhost:3000/api/cart/get",{},{headers:{token}})
    console.log("resss",response.data.cartData);
    setcartItems(response.data.cartData);
  }
    
 useEffect(() => { 
    async function loadData(){
      await fetchFoodList();
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"))
      }
    }
    loadData();
 }, [token])
 
  const contextValue = {
    food_list,
    addToCart,
    removeFromCart,
    cartItems,
    getTotalCartAmount,
    token,
    setToken
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
