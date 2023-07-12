import React from 'react';
import '../../../css/Title.css'

function Title({ pageTitle }) {
  const navbarStyle = {
    backgroundColor: '#2f449de8',
  };

  return (
    <nav className="bar" style={navbarStyle}>
      <p>{pageTitle}</p>
    </nav>
  );
}

export default Title;
