import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount,token,foodList,cartItems,url } = useContext(StoreContext);
  const [data,setData]= useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })
  const navigate = useNavigate();

  const onChanehandler = (event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event)=>{
    event.preventDefault();
    let orderItems = [];
    foodList.map((item)=>{
      if (cartItems[item._id]>0) {
        let itemInfo=item;
        itemInfo["quantity"]=cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,      
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if (response.data.success) {
      const {session_url} = response.data;
      // window.location.replace(session_url);
      Navigate(session_url);
    }
    else{
      alert("Error")
    }
  }
  const naviget = useNavigate();

  useEffect(()=>{
    if (!token) {
      naviget('/cart')
    }
    else if(getTotalCartAmount()===0){
      naviget('/cart')
    }

  },[token])

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChanehandler} value={data.firstName} type="text" placeholder="First Name" />
          <input required name="lastName" onChange={onChanehandler} value={data.lastName}type="text" placeholder="Last Name" />
        </div>
        <input required name="email" onChange={onChanehandler} value={data.email} type="email" placeholder="Email Adress" />
        <input required name="street" onChange={onChanehandler} value={data.street} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input required name="city" onChange={onChanehandler} value={data.city} type="text" placeholder="City" />
          <input  required name="state" onChange={onChanehandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name="zipcode" onChange={onChanehandler} value={data.zipcode} type="text" placeholder="Zip Code" />
          <input  required name="country" onChange={onChanehandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input required name="phone" onChange={onChanehandler} value={data.phone} type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount()===0?0:2}</p>
            </div>
            <div className="cart-total-details">
              <p>total</p>
              <p>{getTotalCartAmount()===0?0:getTotalCartAmount() + 2}</p>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
