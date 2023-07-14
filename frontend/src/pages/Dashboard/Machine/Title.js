import React from 'react';
import '../../../css/Title.css'

function Title({ pageTitle }) {
  const navbarStyle = {
    backgroundColor: '#2f449de8',
  };

  let currentDate = new Date();
  
  // format the date and time to French
  let formattedTime = currentDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  let formattedDate = currentDate.toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });

  // combine time and date
  let formattedDateTime = `${formattedTime}   ${formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}`; 

  return (
    <nav className="bar" style={navbarStyle}>
      <p>{pageTitle}</p> 
      <p1 style={{ fontSize: '1rem' }}>{formattedDateTime}</p1>
    </nav>
  );
}

export default Title;
