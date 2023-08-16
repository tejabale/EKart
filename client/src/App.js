import React from "react";
import { BrowserRouter as Router, Route, Routes , useNavigate} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Logout from "./pages/Logout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp"
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import MerchantSignIn from "./pages/MerchantSignIn";
import MerchantHome from "./pages/MerchantHome";

function App() {
  return (
    <Router>
        <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/signin" element={<SignIn />}></Route>
        <Route exact path="/signup" element={<SignUp />}></Route>
        <Route exact path="/logout" element={<Logout />}></Route>
        <Route exact path="/cart" element={<Cart />}></Route>
        <Route exact path="/merchantsignin" element={<MerchantSignIn />}></Route>
        <Route exact path="/merchanthome" element={<MerchantHome />}></Route>
        <Route path="/product/:productid" element={<Product />}></Route>
        </Routes>
    </Router>
  );
}

export default App;
