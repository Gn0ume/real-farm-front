import React from 'react';
import './Footer.css';
import Logo from '../Header/Logo';
import MenuFooter from './MenuFooter';
import twit from '../../svg/icon_twitter.svg';
import fb from '../../svg/icon_facebook.svg';
import insta from '../../svg/icon_instagram.svg';
import vk from '../../svg/icon_vkontakte.svg';

class Footer extends React.Component {

  render() {
      let nav = [
          {
              text: "Catalog",
              link: "#"
          },
          {
              text: "Home",
              link: "#"
          },
          {
              text: "News",
              link: "#"
          },
          {
              text: "Documents",
              link: "#"
          }
       ];
      let about_us = [
          {
              text: "Who we are",
              link: "#"
          },
          {
              text: "Our team",
              link: "#"
          },
          {
              text: "For Investors",
              link: "#"
          }
      ];
      let soc = [
          {
              text: "Twitter",
              link: "#",
              body: <span className={"navigation_item"}><img src={twit} alt="twitter"/>Twitter</span>
          },
          {
              text: "Facebook",
              link: "#",
              body: <span className={"navigation_item"}><img src={fb} alt="facebook"/>Facebook</span>
          },
          {
              text: "Instagram",
              link: "#",
              body: <span className={"navigation_item"}><img src={insta} alt="instagram"/>Instagram</span>
          },
          {
              text: "Vkontakte",
              link: "#",
              body: <span className={"navigation_item"}><img src={vk} alt="vkontakte"/>Vkontakte</span>
          }
      ];
    return (
        <footer>
            <div className="logo_box">
                <Logo element_class={"logo_footer"} />
                <span className="logo_footer_text">Copyright {String.fromCharCode(169)} 2019 www.real.farm</span>
                <span className="logo_footer_text">All rights reserved.</span>
            </div>
            <MenuFooter name={"Navigation"} items={nav} />
            <MenuFooter name={"About Us"} items={about_us} />
            <MenuFooter name={"Social"} items={soc} />
        </footer>
    );
  }
}

export default Footer;
