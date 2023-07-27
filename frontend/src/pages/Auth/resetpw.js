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
    // first check if the user exists
    const checkUserResponse = await axios.get(`http://localhost:3001/api/checkU?email=${email.value}`);
    if (checkUserResponse.data.status === 'error') {
      toast.error(checkUserResponse.data.message, {
        position: "top-right",
        autoClose: 700,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // if user exists, proceed with sending the code
    const response = await axios.post('http://localhost:3001/api/coderequest', data);
    console.log("Axios response data:", response.data);
    if (response.data.success) {
      let code = response.data.code;
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

      toast.success('Veuillez consulter votre messagerie électronique pour obtenir votre code.', {
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
      toast.error('Veuillez vérifier votre adresse e-mail !', {
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

  
  const handleSubmitchange = async (event) => {
    event.preventDefault();
    var { pass1, pass2 } = document.forms[0];
    var email = localStorage.getItem('resetMail');
    if (pass1.value === pass2.value) {
      let data = { mdp: pass1.value, email: email } // send the password as 'mdp'
      try {
        const response = await axios.put(`http://localhost:5000/api/update`, data); 
        console.log(response.data)
        if (response.data.status === "success") { // check for 'status' instead of 'success' 
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
      } catch (error) {
        console.error(error)
      }
    } else {
      toast.error("Passwords do not match", {
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
  };
  
  //confirm the code 
//confirm the code 
const handleSubmitcode = async (event) => {
  event.preventDefault();
  var code = document.forms[0].elements.namedItem('code');
  var email = localStorage.getItem('resetMail');
  let data = { email: email, code: code.value }
  try {
    const response = await axios.post('http://localhost:5000/api/verifycode', data);
    console.log(response.data); // Received response from the server
    if (response.data.verified) { // change 'success' to 'verified'
      code.value = ""
      setIsConfirmed(true)
      setIsRequested(false)  // Set isRequested to false after verifying the code
    } else {
      toast.error('Veuillez vérifier votre code !', {
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
  

  const verifcode = (
    <div className="child loginform">
      <center><h1>Introduire le code</h1></center>
      <form onSubmit={handleSubmitcode} className="login-form">
        <div className="form-group">
          <div className="child">
            <label>Code</label>
          </div>
          <Input name="code" type="text" align="center" />
        </div>
        <Input id="ddd" type="submit" value="Confirmer le code" />
        <div className="cont"><Link to="/">&lt; Retour</Link></div>
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
                : isRequested ? verifcode 
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