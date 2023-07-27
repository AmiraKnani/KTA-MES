import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import React, { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Input from '@mui/base/Input';
import KTAimg from '../../images/KTA.png'
import '../../css/App.css'
import Footer from '../../components/Footer';
emailjs.init('ZI2HUO6U0zPsqZdR5');

function Resetpw() {
  //verify if the email exists
  const handleSubmitemail = async (event) => {
    event.preventDefault();
    var { email } = document.forms[0];
    localStorage.clear();
    console.log("Form data:", document.forms[0]);
    let code = Math.floor(100000 + Math.random() * 900000);
    const data = { email: email.value, code: code };
    try {
      const response = await axios.post('http://localhost:3001/api/coderequest', data);
      console.log("Axios response data:", response.data);
      if (response.data.success) {
        localStorage.setItem('resetMail', email.value);
        var templateParams = {
          email: email.value,
          code: code
        };
        emailjs.send('service_6f1ny2w', 'template_umam7if', templateParams)
          .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
          }, function (error) {
            console.log('FAILED...', error);
          });
        
        toast.success('Please check your email for your code', {
          position: "top-right",
          autoClose: 700,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        document.forms[0].email.value = ""
        setIsRequested(true)
      } else {
        toast.error('Please verify your email !', {
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
    } catch (error) {
      console.error("Error in handleSubmitemail:", error);
    }
  };
  
  //change the password
  const handleSubmitchange = async (event) => {
    event.preventDefault();
    var { pass1, pass2 } = document.forms[0];
    var email = localStorage.getItem('resetMail');
    let data = { pass1: pass1.value, pass2: pass2.value, email: email }
    try {
      const response = await axios.post('/api/resetpw', data);
      console.log(response.data)
      if (response.data.success) {
        toast.success('Password changed', {
          position: "top-right",
          autoClose: 700,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          window.location.href = './';
        }, 2000);
      } else {
        toast.error(response.data.error, {
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
      // Update your React component state or perform any other actions
    } catch (error) {
      console.error(error)
    }

  };
  //confirm the code 
  const handleSubmitcode = async (event) => {
    event.preventDefault();
    var code = document.forms[0][0]
    var email = localStorage.getItem('resetMail');
    let data = { email: email, code: code.value }
    try {
      const response = await axios.post('/api/codeconf', data);
      console.log(response.data); // Received response from the server
      if (response.data.success) {
        document.forms[0][0].value = ""
        setIsConfirmed(true)
      } else {
        toast.error('Please verify your code !', {
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
      // Update your React component state or perform any other actions
    } catch (error) {
      console.error(error)
    }
  };


  const [isRequested, setIsRequested] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const requested = (
    <div className="child loginform">
      <center><h1>Reset mot de passe</h1></center>
      <form onSubmit={handleSubmitcode} className="login-form">
        <div className="form-group">
          <div className="child">
            <label>Addresse Email</label>
          </div>
          <Input name="email" type="email" align="center" />
        </div>
        <Input id="ddd" type="button" value="Reset mot de passe" onClick={handleSubmitcode} />
        <div className="cont"><Link to="/">&lt; Se connecter</Link></div>
      </form>
      <div className="centered-footer">
        <center><h2><Footer /></h2></center>
      </div>
    </div>
  );
  const notRequested = (
    <div className="child loginform">
      <center><h1>Reset mot de passe</h1></center>
      <form onSubmit={handleSubmitemail} className="login-form">
        <div className="form-group">
          <div className="child">
            <label>Adresse Email</label>
          </div>
          <Input name="email" type="email" align="center" />
        </div>
        <Input id="ddd" type="button" value="Reset mot de passe" onClick={handleSubmitemail} />
        <div className="cont"><Link to="/">&lt; Se connecter</Link></div>
      </form>
      <div className="centered-footer">
        <center><h2><Footer /></h2></center>
      </div>
    </div>


  );
  const confirmed = (
    <div className="child loginform">
      <center><h1>Reset mot de passe</h1></center>
      <form onSubmit={handleSubmitchange} className="login-form">
        <div className="form-group">
          <div className="child">
            <label>Nouveau mot de passe</label>
          </div>
          <Input name="pass1" type="password" align="center" />
        </div>
        <div className="form-group">
          <div className="child">
            <label>Confirmer le nouveau mot de passe</label>
          </div>
          <Input name="pass2" type="password" align="center" />
        </div>

        <Input id="ddd" type="button" value="Reset mot de passe" onClick={handleSubmitchange} />
        <div className="cont"><Link to="/">&lt; Se connecter</Link></div>

      </form>
      <div className="centered-footer">
        <center><h2><Footer /></h2></center>
      </div>
    </div>


  );

  return (
    <>



      <div className="split-screen">
        <div className="left-section">
          <div className="KTA ">
            <img src={KTAimg} alt="KTA MES" className="image" />
          </div>

          <div className="form-group">
            {
              isConfirmed ? confirmed
                : isRequested ? requested
                  : notRequested
            }

          </div>


        </div>




        <div className="right-section">
          <p className="leftp">Connecter a votre station KTA MES 8320</p>
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
}

export default Resetpw;