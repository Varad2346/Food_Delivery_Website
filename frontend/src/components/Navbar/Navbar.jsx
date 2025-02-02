import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setshowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const {getTotalCartAmount,token,setToken}=useContext(StoreContext)
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }
  return (
    <div className="navbar">
      <Link to="/">
        {" "}
        <img src={assets.logo} alt="" />
      </Link>
      <ul className="navbar-menu">
        <li
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </li>
        <li
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </li>
        <li
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </li>
        <li
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.bag_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount()==0? "":"dot"}></div>
        </div>
        {!token?
        <button onClick={() => setshowLogin(true)}>sign in</button>:
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="navbar-profile-dropdown">
              <li><img src={assets.bag_icon} alt="" />Orders</li>
              <hr />
              <li onClick={logout} ><img  src={assets.logout_icon} alt="" />Logout</li>
            </ul>
          </div>
}
      </div>
    </div>
  );
};

export default Navbar;
