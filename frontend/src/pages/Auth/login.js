import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import KTAimg from '../../images/KTA.png';
import Input from '@mui/base/Input';
//import './css/login.css'
import Footer from '../../components/Footer'

function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const navigate = useNavigate();
  const loginState = localStorage.getItem('localogin')
  useEffect(() => {
    // Test if the client is alredy logged in
    const myVariable = localStorage.getItem('isLoggedin');
    if (myVariable) {
      navigate('/dashboard');
    }
  }, []);




  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Adjust the breakpoint as per your requirement
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial check on component mount
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);





  const handleSubmit = async (event) => {
    event.preventDefault();
    var { uname, pass } = document.forms[0];
    let data = { email: uname.value, password: pass.value }
    try {

      const response = await axios.post('/api/login', data);

      if (response.data.result.login) {
        localStorage.setItem('isLoggedin', true);
        localStorage.setItem('username', response.data.result.username);
        localStorage.setItem('email', response.data.result.email);
        localStorage.setItem('pic', response.data.result.pic);
        navigate('/dashboard');
      } else {
        toast.error(response.data.result.err, {
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
      console.log(error);
    }

  };

  return (
    <>






      <div className="split-screen">
        <div className="left-section">
          
          <div className="KTA">
            <img src={KTAimg} alt="KTA MES" className="image" />
          </div>
          <div className="child loginform">
            <center><h1>Se Connecter</h1></center>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <div className="child">
                  <label >Nom Utilisateur</label>
                </div>
                <Input  name="uname" type="email" align="center" />
              </div>
              <div className="form-group">
                <div className="child">
                  <label >Mot De Passe</label>
                </div>
                <Input  name="pass" type="password" align="center" />
              </div>
              <div className="mdp"><Link to="/resetpw">Mot de passe oublié</Link></div>
              <Input id="ddd" type="button" value="Se Connecter" onClick={handleSubmit} />
              <div className="cont"><Link to="/contactus">Créer un compte</Link></div>
            </form>
            <div className="centered-footer">
            <center><h2><Footer/></h2></center>
            </div>
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

export default App;