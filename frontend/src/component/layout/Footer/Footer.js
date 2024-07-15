import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App from Android and IOS mobile phone</p>
        <img src={playStore} alt="play-store.png" />
        <img src={appStore} alt="app-store.png" />
      </div>

      <div className="midFooter">
        <h1>E-Commerce.</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2024 &copy; OG🤘</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/omgupta256/">Instagram</a>
        <a href="https://www.linkedin.com/in/om-gupta-3961a1178">LinkedIn</a>
        <a href="https://github.com/guptaom256">Github</a>
      </div>
    </footer>
  );
};

export default Footer;
