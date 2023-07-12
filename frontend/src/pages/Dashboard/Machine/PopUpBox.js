import React from 'react';
import '../../../css/PopUpBox.css';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';

const PopUpBox = () => {
    const username=localStorage.getItem("username");
    const email=localStorage.getItem("email");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
      };
return (
    <div >
        <p className='username' >{username}</p>
        <p className='email' >{email}</p>
        <Divider/>

      <ul className="pop-up-items">
        <li className="pop-up-item">Settings</li>
        <li className="pop-up-item">User Details</li>
        <li className="pop-up-item" onClick={handleLogout}>Logout</li>

      </ul>
    </div>
  );
};

export default PopUpBox;