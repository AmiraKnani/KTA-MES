import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import KTAimg from '../../images/KTA.png'
import Input from '@mui/base/Input';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Footer from '../../components/Footer'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const ContactUs = () => {
  const form = useRef();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    var { nom, email, tel, societe, pass  } = document.forms[0];
  
    let data = { nom: nom.value, email: email.value, tel:tel.value, codeE:societe.value, mdp: pass.value }; 
  
    // Data validation
    if (nom.value === '') {
        toast.error('Veuillez fournir un nom.');
        return;
    }
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        toast.error('Veuillez fournir une adresse e-mail valide.');
        return;
    }
  
    if (pass.value.length < 6) {
        toast.error('Le mot de passe doit comporter au moins 6 caractères.');
        return;
    }
  
    try {
      const response = await axios.post(process.env.BASEURL+'userAdd', data);
  
      
        toast.success('User added successfully', {
          position: "top-right",
          autoClose: 700,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        
  
  
    } catch (error) {
      console.log(error);
      if(error.response && error.response.status === 400) {
          toast.error('Registration failed. Try another email.', {
              position: "top-right",
              autoClose: 700,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
          });
      }
    }
  };
  

  return (
    <>
    <div className="split-screen">
        <div className="left-section"> 
          <div className="KTA ">    
            <img src={KTAimg} alt="KTA MES" className="image" />
          </div>
          <div className="child loginform">
            <center><h1>Créer un compte</h1></center>
            <form ref={form} onSubmit={handleSubmit} className="registration-form">
              <div className="form-group">
                <div className="rez">
                <div className='child'>
                <label>Nom d'utilisateur</label>
                <Input  name="nom" type="text" align="center" />
                </div>
                
                </div>
              </div>
              <div className="form-group">
              <div className="child">
                  <label >Adresse Email</label>
                <Input  name="email" type="email" align="center" />
                </div>
                <div className="child">
                  <label >Numéro de téléphone</label>
                <Input  name="tel" type="text" align="center" />
                </div>
                <div className="child">
                  <label >Code de l’entreprise</label>
                <Input  name="societe" type="text" align="center" />
                </div>
                <div className="form-group">
                <div className="child">
                  <label >Mot De Passe</label>
                </div>
                <Input  name="pass" type="password" align="center" />
              </div>
                <input id="ddd" type="submit" value="Inscription"/>
              <div className="cont"><Link to="/">Connecter</Link></div>

              </div>

            </form>
            <div className="centered-footer">
            <center><h2><Footer/></h2></center>
            </div>
          </div>

          

        </div>
        <div className="right-section">
          <p className="leftp">Créer un compte pour superviser votre entreprise via la station KTA MES 8320</p>

        </div>
    </div>
    <ToastContainer
    position="top-right"
    autoClose={700}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
    </>
  );
};
