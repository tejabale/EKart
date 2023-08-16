import axios from "axios";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CartProductView from "../components/cartProductView";
import * as Icon from "react-bootstrap-icons"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


export default function Cart() {
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [cost, setCost] = useState(0);
    const [ok, setOk] = useState(true);

    const checkoutHandler = (e) => {
        if (ok) {
            // toast.success("Checkout Successful");
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:3001/api/checkout', { cartItems: cartItems }, { withCredentials: true }).then(async (response) => {
                if (response.data.loggedIn === false) {
                    navigate("/signin");
                }
                else {
                    toast.success("Checkout Successful");
                    // reload the page
                    // wait for 1 second
                    // wait for 1 second using promise
                    setCartItems([]);
                    setCost(0);
                    // await new Promise((resolve) => setTimeout(resolve, 500));
                }
            });
        }
        else {
            toast.error("stock not available");
        }
    }

    const logout = (e) => {
        e.preventDefault();
        navigate("/logout");
    };

    useEffect(() => {
        axios.get('http://localhost:3001/api/cartItems', { withCredentials: true })
            .then((response) => {
                if (response.data.loggedIn === false) {
                    navigate("/signin");
                }
                setCartItems(response.data.cartData);
                setCost(response.data.cost);
            })
    }, []);

    return (
        // <cartProductView key={item.productid} item={item} />
        <>
            <ToastContainer />
            <header>
                <h2 className="logo"> Ekart </h2>
                <nav className="navigation">
                    <a href="/about">About</a>
                    <a href="/"><Icon.House size={25} className="home" /></a>
                    <a href="/cart"> <Icon.Cart3 size={25} className="cart" /> Cart</a>
                    <a href="/profile"><Icon.PersonCircle size={30} className="profile" /></a>
                    <button class="btnLogout-popup" onClick={logout}>Log Out</button>
                </nav>
            </header>

            <section className='container sproduct my-5 pt-5'>
                <h3>Cart</h3>
                {cartItems.length > 0 ? (
                    <>
                        {cartItems.map((item, i) => (
                            <Fragment key={i}>
                                <CartProductView item={item} checkHandler={setOk} />
                            </Fragment>
                        ))}

                        <p>total cost of the cart is {cost}</p>
                        <button className="btnCheckout-popup" onClick={checkoutHandler}>Checkout</button>
                    </>
                ) : <p>Your Cart is Empty </p>}
            </section>

        </>
    )
}
