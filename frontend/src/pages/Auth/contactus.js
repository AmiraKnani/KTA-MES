import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import KTAimg from '../../images/KTA.png'
import Input from '@mui/base/Input';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer'


export const ContactUs = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_9fl84wo', 'template_08zibwc', form.current, 'S6ao3GJZ9msvkAUAO')
      .then((result) => {
          toast.success('We will contact you soon !', {
            position: "top-right",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });

      }, (error) => {
          console.log(error.text);
          const err = 'Error, type:\n \ '+error.text
            toast.error(err, {
            position: "top-right",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
      });
  };

  return (
    <>
    <div className="split-screen">
        <div className="left-section"> 
          <div className="KTA ">    
            <img src={KTAimg} alt="KTA MES" className="image" />
          </div>
          <div className="child loginform">
            <center><h1>Contactez-nous</h1></center>
            <form ref={form} onSubmit={sendEmail} className="login-form">
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
                  <label >Nom de l’entreprise</label>
                <Input  name="societe" type="text" align="center" />
                </div>
                <div className="form-group">
                <div className="child">
                  <label >Mot De Passe</label>
                </div>
                <Input  name="pass" type="password" align="center" />
              </div>
                <input id="ddd" type="submit" value="Nous-contactez"/>
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
          <p className="leftp1">Station de pilotage des ressources de l'entreprise à distance et en temps réel</p>

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
