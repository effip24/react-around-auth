import logo from "../images/logo.svg";
import hamburgerIcon from "../images/hamburger.svg";
import closeIcon from "../images/hamburger-close.svg";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = ({ onLogout }) => {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  const location = useLocation();
  const isMain = location.pathname === "/" ? true : false;
  const isSignup = location.pathname === "/signup" ? true : false;
  const isSignin = location.pathname === "/signin" ? true : false;

  const handleHamburgerClick = () => {
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
  };

  return (
    <header className="header">
      <div className={`header__hamburger-menu ${isHamburgerMenuOpen ? "header__hamburger-menu_open" : ""}`}>
        <ul className="header__links header__links_type_hamburger">
          <li className="header__link header__link_type_email">{localStorage.getItem("email")}</li>
          <li className="header__link">
            <p className="header__link" to="/signin" onClick={onLogout}>
              Log out
            </p>
          </li>
        </ul>
      </div>
      <div className="header__container">
        <img src={logo} alt="Around The U.S." className="header__logo" />
        <ul className={`header__links ${isMain ? "header__links_type_main" : ""}`}>
          <li className="header__link header__link_type_email">{isMain ? localStorage.getItem("email") : ""}</li>
          <li className="header__link">
            {isSignup ? (
              <Link className="header__link" to="/signin">
                Sign in
              </Link>
            ) : isSignin ? (
              <Link className="header__link" to="/signup">
                Sign up
              </Link>
            ) : (
              <p className="header__link" to="/signin" onClick={onLogout}>
                Log out
              </p>
            )}
          </li>
        </ul>
        {isMain ? (
          <img
            src={isHamburgerMenuOpen ? closeIcon : hamburgerIcon}
            alt="hamburger-menu"
            className="header__hamburger"
            onClick={handleHamburgerClick}
          ></img>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};

export default Header;
