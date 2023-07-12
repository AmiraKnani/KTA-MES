import React from 'react';
import '../css/Footer.css';
const Footer = (props) => {
  return (
    <footer className={props.view==="dash" ? 'footerd' : 'footer'}>
      
      <p>© 2023 Logidas. All rights reserved.</p>
    </footer>
  );
};

export default Footer;